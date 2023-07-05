import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"
import ora from "ora"
import { execa } from "execa"

export function getPackageManager() {
    const userAgent = process.env.npm_config_user_agent

    if (!userAgent) {
        return "npm"
    }

    if (userAgent.startsWith("yarn")) {
        return "yarn"
    }

    if (userAgent.startsWith("pnpm")) {
        return "pnpm"
    }

    return "npm"
}


export function getPackageInfo() {
    const packageJsonPath = path.join("package.json")
    return fs.readJSONSync(packageJsonPath) as PackageJson
}


export const installer = async (packageManager: string, packages: string[]) => {
    const installSpinner = ora(`Installing ${packages.join(", ")}...`).start()
    installSpinner.color = 'yellow';
    await execa(packageManager, [packageManager !== "npm" ? "add" : "install", ...packages]).then(() => {
        installSpinner.succeed(`${packages.join(", ")} installed successfully`)
    }).catch(() => {
        installSpinner.fail(`Failed to install ${packages.join(", ")}`)
    })
}

export const createDirIfNotExists = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

export const separator = (dir: string) => {
    const mainDir = dir.split("/").slice(0, -1).join("/")
    const file = dir.split("/").slice(-1)[0]
    return { mainDir, file }
}