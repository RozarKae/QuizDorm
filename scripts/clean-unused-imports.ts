import ts from "typescript";
import fs from "fs";
import path from "path";

// Function to clean unused imports in a list of files using TS LanguageService
export function cleanImportsInFiles(filePaths: string[]): { modified: string[]; totalChanges: number } {
  const rootDir = process.cwd();
  const absolutePaths = filePaths.map((f) => path.resolve(rootDir, f));

  const host: ts.LanguageServiceHost = {
    getScriptFileNames: () => absolutePaths,
    getScriptVersion: () => "1",
    getScriptSnapshot: (fileName) => {
      if (fs.existsSync(fileName)) {
        return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName, "utf-8"));
      }
      return undefined;
    },
    getCurrentDirectory: () => rootDir,
    getCompilationSettings: () => ({
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      noUnusedLocals: true,
    }),
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  const ls = ts.createLanguageService(host, ts.createDocumentRegistry());
  const modifiedFiles: string[] = [];
  let totalChanges = 0;

  for (const filePath of absolutePaths) {
    try {
      const organize = ls.organizeImports({ type: "file", fileName: filePath }, {}, {});
      if (organize.length > 0 && organize[0].textChanges.length > 0) {
        const originalContent = fs.readFileSync(filePath, "utf-8");
        // Sort changes descending by start position to prevent offset corruption
        const sortedChanges = [...organize[0].textChanges].sort((a, b) => b.span.start - a.span.start);
        let newContent = originalContent;
        for (const change of sortedChanges) {
          const prefix = newContent.slice(0, change.span.start);
          const suffix = newContent.slice(change.span.start + change.span.length);
          newContent = prefix + change.newText + suffix;
        }

        if (newContent !== originalContent) {
          fs.writeFileSync(filePath, newContent, "utf-8");
          const rel = path.relative(rootDir, filePath).replace(/\\/g, "/");
          modifiedFiles.push(rel);
          totalChanges += organize[0].textChanges.length;
        }
      }
    } catch (err: any) {
      console.error(`Error organizing imports in ${filePath}:`, err.message);
    }
  }

  return { modified: modifiedFiles, totalChanges };
}

if (process.argv[1] && process.argv[1].includes("clean-unused-imports.ts")) {
  // Test on marketing pages first
  const testBatch = [
    "app/(marketing)/about/page.tsx",
    "app/(marketing)/privacy/page.tsx",
    "app/(marketing)/terms/page.tsx",
  ];
  const result = cleanImportsInFiles(testBatch);
  console.log(`Cleaned ${result.totalChanges} changes across ${result.modified.length} test files:`, result.modified);
}
