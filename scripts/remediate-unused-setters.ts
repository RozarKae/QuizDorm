import * as fs from "fs";

const lines = fs.readFileSync("scripts/remaining-unused-vars.txt", "utf8").trim().split("\n");

const fileMap = new Map<string, Array<{ lineNo: number; varName: string }>>();

for (const line of lines) {
  const [loc, msg] = line.split(" -> ");
  if (!loc || !msg) continue;
  const lastColon = loc.lastIndexOf(":");
  const secondLastColon = loc.lastIndexOf(":", lastColon - 1);
  const file = loc.substring(0, secondLastColon);
  const lineNo = parseInt(loc.substring(secondLastColon + 1, lastColon), 10);

  const varMatch = msg.match(/'([^']+)'/);
  const varName = varMatch ? varMatch[1] : "";

  if (varName.startsWith("set")) {
    if (!fileMap.has(file)) {
      fileMap.set(file, []);
    }
    fileMap.get(file)!.push({ lineNo, varName });
  }
}

let modifiedFiles = 0;
let modifiedLines = 0;

for (const [file, items] of fileMap.entries()) {
  if (!fs.existsSync(file)) continue;
  const fileLines = fs.readFileSync(file, "utf8").split("\n");
  let fileChanged = false;

  for (const { lineNo, varName } of items) {
    const idx = lineNo - 1;
    const sourceLine = fileLines[idx];
    if (!sourceLine) continue;

    const regex = new RegExp("\\[\\s*(\\w+)\\s*,\\s*" + varName + "\\s*\\]");
    if (regex.test(sourceLine)) {
      fileLines[idx] = sourceLine.replace(regex, (_m, p1) => "[" + p1 + "]");
      fileChanged = true;
      modifiedLines++;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(file, fileLines.join("\n"), "utf8");
    modifiedFiles++;
  }
}

console.log(`Successfully updated ${modifiedLines} lines across ${modifiedFiles} files.`);
