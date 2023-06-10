import ora from "ora";
import { Provider, getPrismaSchema } from "../templates/adapter";

export const prismaSetup = (provider?: Provider, url?: string) => {
    const prismaSpinner = ora(`Generating Prisma Schema...`).start()
    prismaSpinner.color = 'yellow';
    prismaSpinner.color = 'yellow';
    const schema = provider && url ? getPrismaSchema({
        provider: provider,
        url: url
    }) : getPrismaSchema()
    prismaSpinner.succeed("Prisma Schema generated successfully")
    return schema
}