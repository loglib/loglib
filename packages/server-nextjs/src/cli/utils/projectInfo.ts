import { existsSync } from "fs";
import path from "path";
import fs from "fs-extra";
import { TsConfigJson } from "type-fest";

export async function getProjectInfo() {
  const info = {
    srcDir: false,
    appDir: false,
    ts: false,
  };
  try {
    return {
      srcDir: existsSync(path.resolve("./src")),
      appDir:
        existsSync(path.resolve("./app")) ||
        existsSync(path.resolve("./src/app")),
      ts: await getTsConfig(),
    };
  } catch {
    return info;
  }
}

async function getTsConfig() {
  try {
    const tsconfigPath = path.join("tsconfig.json");
    const tsconfig = (await fs.readJSON(tsconfigPath)) as TsConfigJson;
    if (!tsconfig) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
