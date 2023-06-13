// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
import { Command } from 'commander';
import { getPackageManager, installer } from './utils/utils';
import { logger } from './utils/log';
import prompts from "prompts"
import { existsSync } from 'fs';
import { Provider } from './templates/adapter';
import fs from 'fs-extra'
import { download, locationSetup } from './setups/location';
import { setupDashboard } from './setups/dashboard';
import { setupTracker } from './setups/tracker';
import { authSetup } from './setups/auth';
import { prismaSetup } from './setups/adapter';
import { serverSetup } from './setups/server';
import { PackageJson } from 'type-fest';

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

export async function main() {
    const packageManager = getPackageManager()
    const program = new Command()
        .name("loglib")
        .description("Loglib CLI")

    program.command('init').description('Configure your Next Js project').action(async () => {
        const adapter = await prompts({
            type: "select",
            name: "adapter",
            message: "What adapter do you want to use?",
            choices: [{
                value: "prisma",
                title: "Prisma",
                selected: true
            }, {
                value: "supabase",
                title: "Supabase"
            }]
        }).then(res => res.adapter as "prisma" | "supabase")

        if (adapter === "prisma") {
            await installer(packageManager, ["@loglib/prisma-adapter"])
            if (existsSync("prisma/schema.prisma")) {
                logger.success("Prisma schema already exists")
                const generatedSchema = prismaSetup()
                const schema = fs.readFileSync("prisma/schema.prisma", "utf-8")
                fs.writeFileSync("prisma/schema.prisma", schema + "\n" + generatedSchema)
            } else {
                const provider = await prompts({
                    type: "select",
                    name: "value",
                    message: "Choose your database provider?",
                    choices: [{
                        value: "sqlite",
                        title: "Sqlite",
                        selected: true
                    }, {
                        value: "postgresql",
                        title: "Postgresql"
                    }, {
                        value: "mysql",
                        title: "Mysql"
                    }, {
                        value: "vercel-postgres",
                        title: "Vercel Postgres",
                    }]
                }).then(res => res.value as string)
                const db_url = provider === "sqlite" ? '"file:./dev.db"' : provider === "vercel-postgres" ? 'env("POSTGRES_PRISMA_URL")' : 'env("DATABASE_URL")'
                const schema = prismaSetup(provider === "vercel-postgres" ? "postgresql" : provider as Provider, db_url)
                fs.mkdirSync("prisma");
                fs.writeFileSync("prisma/schema.prisma", schema)

                const installPrisma = await prompts({
                    type: "confirm",
                    message: "Do you want to install Prisma and Prisma Client?",
                    name: "install",
                })
                if (installPrisma.install) {
                    await installer(packageManager, ["prisma", "@prisma/client"])
                } else {
                    logger.warn("You can install Prisma later by running" + `${packageManager} ${packageManager === "npm" ? "install" : "add"} prisma @prisma/client`)
                }
            }
            logger.info("You can now run `npx prisma migrate dev or npx prisma db push` to create or update your database schema")
        } else if (adapter === "supabase") {
            await installer(packageManager, ["@loglib/supabase-adapter"])
            const installSupabase = await prompts({
                type: "confirm",
                message: "Do you want to install supabase-js?",
                name: "install",
            })
            if (installSupabase.install) {
                await installer(packageManager, ["@supabase/supabase-js"])
            } else {
                logger.warn(`Make sure to install supabase-js later by running` + `${packageManager} ${packageManager === "npm" ? "install" : "add"}  @supabase/supabase-js`)
            }
            logger.info("Important! Copy the SQL code from the following link: https://github.com/LogLib/loglib#next-js-with-supabase and paste it into your Supabase SQL editor to create the necessary tables for LogLib.")
        }
        const auth = await authSetup()
        const loc = await locationSetup()
        await serverSetup(adapter, auth, loc === "disable", loc === "custom")
        await setupDashboard(packageManager)
        await setupTracker(packageManager)
    })
    program.command("setup:maxmind").description("Download maxmind database").action(async () => {
        await download()
    })
    program.command("update").description("Update Loglib").action(async () => {
        const packageJSON = fs.readJSONSync("package.json") as PackageJson
        const packages = packageJSON.dependencies && Object.keys(packageJSON.dependencies).filter(pkg => pkg.startsWith("@loglib")).map(pkg => pkg + "@latest")
        packages && await installer(packageManager, packages)
    })
    program.parse();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()