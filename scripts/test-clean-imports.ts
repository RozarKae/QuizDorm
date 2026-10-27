import ts from "typescript";
import fs from "fs";
import path from "path";

// Test using TS LanguageService to organize/clean imports
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
console.log("Organize import text changes count:", organize.length);
if (organize.length > 0) {
  console.log("First change:", organize[0]);
}
