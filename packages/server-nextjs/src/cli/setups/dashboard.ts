import prompts from "prompts"
import { getProjectInfo } from "../utils/projectInfo"
import { logger } from "../utils/log"
import ora from "ora"
import { createDirIfNotExists, installer } from "../utils/utils"
import fs from 'fs-extra'
import { generateDashboard } from "../templates/dashboard"

export const setupDashboard = async (packageManager: string) => {
    const { ts, srcDir, appDir } = await getProjectInfo()
    const ext = ts ? "tsx" : "jsx"
    const res = await prompts({
        type: "text",
        name: "dashboard",
        message: "Where should your dashboard be?",
        initial: appDir ? srcDir ? `./src/app/loglib/page.${ext}` : `./app/loglib/page.${ext}` : srcDir ? `./src/pages/loglib.${ext}` : `./pages/loglib.${ext}`,
        validate: (value: string) => value.length > 0 ? true : "Please enter a valid path",
    }).then(res => res.dashboard as string)
    await installer(packageManager, ['@loglib/ui'])
    const dashboardSpinner = ora(`Generating Dashboard...`).start()
    const dir = res.split("/").slice(0, -1).join("/")
    const file = res.split("/").slice(-1)[0]
    if (!file?.endsWith(".tsx")) {
        logger.error("Please enter a valid path")
        process.exit(1)
    }
    createDirIfNotExists(`${dir}`)
    fs.writeFileSync(`${dir}/${file}`, generateDashboard(appDir))
    dashboardSpinner.succeed("Dashboard generated successfully")
}