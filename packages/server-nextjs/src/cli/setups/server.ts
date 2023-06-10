import { generateServerPrisma, generateServerSupabase } from "../templates/server"
import { getProjectInfo } from "../utils/projectInfo"
import { createDirIfNotExists, separator } from "../utils/utils"
import fs from 'fs-extra'


export const serverSetup = async (adapter: "supabase" | "prisma", auth: boolean, disableLocation: boolean, customLocation: boolean) => {
    const { srcDir, appDir, ts } = await getProjectInfo()
    const ext = ts ? "ts" : "js"
    if (appDir) {
        const dir = srcDir ? `./src/app/api/loglib/route.${ext}` : `./app/api/loglib/route.${ext}`
        const { mainDir } = separator(dir)
        createDirIfNotExists(mainDir)
        fs.writeFileSync(dir, adapter === "supabase" ? generateServerSupabase(true, ts, auth, disableLocation, customLocation) : generateServerPrisma(true, ts, auth, disableLocation, customLocation))
    } else {
        const dir = srcDir ? "./src/pages/api/loglib.ts" : "./pages/api/loglib.ts"
        const { mainDir } = separator(dir)
        createDirIfNotExists(mainDir)
        fs.writeFileSync(dir, adapter === "supabase" ? generateServerSupabase(false, ts, auth, disableLocation, customLocation) : generateServerPrisma(false, ts, auth, disableLocation, customLocation))
    }
}