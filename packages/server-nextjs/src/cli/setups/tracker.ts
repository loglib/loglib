import prompts from "prompts"
import { getProjectInfo } from "../utils/projectInfo"
import { installer } from "../utils/utils"
import { logger } from "../utils/log"

export const setupTracker = async (packageManager: string) => {
    const { ts, appDir } = await getProjectInfo()
    const ext = ts ? "tsx" : "jsx"
    const res = await prompts({
        type: "confirm",
        name: "tracker",
        message: "Do you want to install the tracker in this project?",
        initial: true
    }).then(res => res.tracker as boolean)
    if (res) {
        await installer(packageManager, ['@loglib/tracker'])
        logger.info("\n\nfollow the steps below to setup the tracker\n",)
        logger.info(`1. import Loglib from "@loglib/tracker/react"\n`)
        logger.info(`2. Add <Loglib /> component to your ${appDir ? `layout.${ext}` : `_app.${ext}`} file`)
        logger.info("3. Refer to this doc for more: https://github.com/LogLib/loglib#loglib-tracker\n\n")
    } else {
        logger.info("\nfollow the steps below to setup the tracker in any of your project\n",)
        logger.info("1. Install the tracker using the command below")
        logger.info(`\n${packageManager} add @loglib/tracker\n`)
        logger.info(`2. If it's react project\n import Loglib from "@loglib/tracker/react\n if not\nimport {logLib} from "@loglib/tracker"\n call loglib.record() in your main entry file."\n`)
        logger.info("4. Refer to this doc for more: https://github.com/LogLib/loglib#loglib-tracker\n\n")
    }
    logger.success("Loglib setup successfully! 🎉")
}