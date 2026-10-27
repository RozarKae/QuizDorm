import fs from "fs";
import path from "path";
import ts from "typescript";

function getAllTsFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!["node_modules", ".next", "dist", "out", "build", "coverage", ".git"].includes(file)) {
        getAllTsFiles(fullPath, fileList);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function cleanFolderImports(folderName: string) {
  const rootDir = process.cwd();
  const targetDir = path.resolve(rootDir, folderName);
  if (!fs.existsSync(targetDir)) {
    console.log(`Directory ${targetDir} does not exist`);
    return;
  }

  const allFiles = getAllTsFiles(targetDir);
  console.log(`Found ${allFiles.length} files in ${folderName}`);

  const host: ts.LanguageServiceHost = {
    getScriptFileNames: () => allFiles,
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
  let modifiedCount = 0;

  for (const filePath of allFiles) {
    try {
      const organize = ls.organizeImports({ type: "file", fileName: filePath }, {}, {});
      if (organize.length > 0 && organize[0].textChanges.length > 0) {
        const originalContent = fs.readFileSync(filePath, "utf-8");
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
          console.log(`Cleaned: ${rel}`);
          modifiedCount++;
        }
      }
    } catch (err: any) {
      console.error(`Error in ${filePath}:`, err.message);
    }
  }

  console.log(`Completed ${folderName}: ${modifiedCount} files modified.`);
}

const target = process.argv[2] || "app";
cleanFolderImports(target);
