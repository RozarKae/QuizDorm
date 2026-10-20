import zlib from "zlib";

export interface ExtractedDocumentContent {
  text: string;
  pageCount?: number;
  wordCount: number;
  extractionMethod: "pdf_stream_decompression" | "plaintext" | "fallback";
}

/**
 * Robust server-side document text extractor supporting PDF, TXT, MD, and common text formats.
 * Uses native Node.js zlib decompression for FlateDecode PDF content streams without external binary bloat.
 */
export class DocumentTextExtractor {
  /**
   * Extract text from buffer based on MIME type or filename
   */
  public static extractText(buffer: Buffer, mimeType: string, fileName?: string): ExtractedDocumentContent {
    const lowerName = (fileName || "").toLowerCase();

    // 1. Plaintext & Markdown
    if (
      mimeType === "text/plain" ||
      mimeType === "text/markdown" ||
      lowerName.endsWith(".txt") ||
      lowerName.endsWith(".md") ||
      lowerName.endsWith(".markdown")
    ) {
      const text = buffer.toString("utf-8").trim();
      return {
        text,
        wordCount: text ? text.split(/\s+/).length : 0,
        extractionMethod: "plaintext",
      };
    }

    // 2. PDF Document
    if (mimeType === "application/pdf" || lowerName.endsWith(".pdf")) {
      return this.extractFromPdf(buffer);
    }

    // 3. Fallback for other formats
    const text = buffer.toString("utf-8").replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " ").trim();
    return {
      text: text.slice(0, 10000),
      wordCount: text ? text.split(/\s+/).length : 0,
      extractionMethod: "fallback",
    };
  }

  /**
   * PDF Content Stream Extractor
   */
  private static extractFromPdf(buffer: Buffer): ExtractedDocumentContent {
    const rawString = buffer.toString("binary");
    const extractedChunks: string[] = [];
    let pageCount = 0;

    // Approximate page count via /Type /Page
    const pageMatches = rawString.match(/\/Type\s*\/Page\b/g);
    if (pageMatches) {
      pageCount = pageMatches.length;
    }

    // Match all 'stream ... endstream' segments
    const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
    let match: RegExpExecArray | null;

    while ((match = streamRegex.exec(rawString)) !== null) {
      const rawStream = match[1];
      let streamText = "";

      // Try uncompressing via zlib inflate (FlateDecode)
      try {
        const streamBuf = Buffer.from(rawStream, "binary");
        const decompressed = zlib.inflateSync(streamBuf);
        streamText = decompressed.toString("utf-8");
      } catch {
        try {
          const streamBuf = Buffer.from(rawStream, "binary");
          const decompressed = zlib.inflateRawSync(streamBuf);
          streamText = decompressed.toString("utf-8");
        } catch {
          // If uncompressed, search directly in the raw stream
          streamText = rawStream;
        }
      }

      if (streamText && streamText.includes("BT")) {
        // Extract text tokens within BT ... ET blocks
        const textTokens = this.parseTextFromStream(streamText);
        if (textTokens.length > 0) {
          extractedChunks.push(...textTokens);
        }
      }
    }

    // If stream decompression didn't yield text (e.g. non-standard font encoding or scanned),
    // search for literal strings in raw PDF (between parentheses)
    if (extractedChunks.length < 5) {
      const literalMatches = rawString.match(/\(([A-Za-z0-9\s.,!?:;'"\-+*/=()_]{4,})\)/g);
      if (literalMatches) {
        for (const lit of literalMatches.slice(0, 200)) {
          const clean = lit.slice(1, -1).trim();
          if (clean && !clean.startsWith("obj") && !clean.startsWith("endobj")) {
            extractedChunks.push(clean);
          }
        }
      }
    }

    const fullText = extractedChunks
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      text: fullText,
      pageCount: pageCount || 1,
      wordCount: fullText ? fullText.split(/\s+/).length : 0,
      extractionMethod: "pdf_stream_decompression",
    };
  }

  /**
   * Parse PostScript text operators from a decompressed PDF content stream
   */
  private static parseTextFromStream(streamText: string): string[] {
    const results: string[] = [];

    // Match BT ... ET blocks
    const btRegex = /BT([\s\S]*?)ET/g;
    let btMatch: RegExpExecArray | null;

    while ((btMatch = btRegex.exec(streamText)) !== null) {
      const block = btMatch[1];

      // 1. Single string operators: (Text) Tj or (Text) ' or (Text) "
      const tjRegex = /\(([^)]*)\)\s*(?:Tj|'|")/g;
      let tjMatch: RegExpExecArray | null;
      while ((tjMatch = tjRegex.exec(block)) !== null) {
        const str = tjMatch[1].replace(/\\([\\()])/g, "$1").trim();
        if (str.length > 0) {
          results.push(str);
        }
      }

      // 2. Text array operator: [(Part 1) -120 (Part 2)] TJ
      const arrayTjRegex = /\[([^\]]*)\]\s*TJ/g;
      let arrayMatch: RegExpExecArray | null;
      while ((arrayMatch = arrayTjRegex.exec(block)) !== null) {
        const inner = arrayMatch[1];
        const innerStrings = inner.match(/\(([^)]*)\)/g);
        if (innerStrings) {
          const combined = innerStrings
            .map((s) => s.slice(1, -1).replace(/\\([\\()])/g, "$1"))
            .join("");
          if (combined.trim().length > 0) {
            results.push(combined.trim());
          }
        }
      }

      // 3. Hexadecimal encoded text: <00410042> Tj
      const hexRegex = /<([0-9A-Fa-f]+)>\s*Tj/g;
      let hexMatch: RegExpExecArray | null;
      while ((hexMatch = hexRegex.exec(block)) !== null) {
        const hex = hexMatch[1];
        try {
          const buf = Buffer.from(hex, "hex");
          // Check UTF-16BE or ASCII
          const decoded = buf.length % 2 === 0 ? buf.swap16().toString("utf16le") : buf.toString("ascii");
          if (decoded && decoded.trim().length > 0) {
            results.push(decoded.trim());
          }
        } catch {
          // ignore hex decode error
        }
      }
    }

    return results;
  }
}
