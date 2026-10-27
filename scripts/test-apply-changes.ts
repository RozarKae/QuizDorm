import ts from "typescript";
import fs from "fs";
import path from "path";

const testFile = path.resolve("app/(marketing)/about/page.tsx");
const content = fs.readFileSync(testFile, "utf-8");

const host: ts.LanguageServiceHost = {
  getScriptFileNames: () => [testFile],
  getScriptVersion: () => "1",
  getScriptSnapshot: (fileName) => {
    if (fileName === testFile) {
      return ts.ScriptSnapshot.fromString(content);
    }
    if (fs.existsSync(fileName)) {
      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName, "utf-8"));
    }
    return undefined;
  },
  getCurrentDirectory: () => process.cwd(),
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
const organize = ls.organizeImports({ type: "file", fileName: testFile }, {}, {});

function applyTextChanges(text: string, changes: readonly ts.TextChange[]): string {
  // Sort changes in reverse order so spans don't shift
  const sorted = [...changes].sort((a, b) => b.span.start - a.span.start);
  let res = text;
  for (const c of sorted) {
    const prefix = res.slice(0, c.span.start);
    const suffix = res.slice(c.span.start + c.span.length);
    res = prefix + c.newText + suffix;
  }
  return res;
}

if (organize.length > 0) {
  const updated = applyTextChanges(content, organize[0].textChanges);
  console.log("First 15 lines of updated file:");
  console.log(updated.split("\n").slice(0, 15).join("\n"));
}
