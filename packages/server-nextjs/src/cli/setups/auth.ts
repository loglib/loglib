import prompts from "prompts"
import fs from 'fs-extra'

export const authSetup = async () => {
    const res = await prompts({
        type: "select",
        name: "auth",
        message: "Do you want to setup authentication?",
        choices: [{
            value: "yes",
            title: "Yes",
            selected: true
        }, {
            value: "no",
            title: "No"
        }]
    })
    if (res.auth === "yes") {
        const username = await prompts({
            type: "text",
            name: "username",
            message: "Enter username:",
        })
        const password = await prompts({
            type: "password",
            name: "password",
            message: "Enter password:",
        })

        const res = await prompts({
            type: "text",
            name: "secret",
            message: "Enter jwt secret key:",
            validate: (value: string) => value.length > 6 ? true : "Please enter a valid secret key",
            initial: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        })
        fs.existsSync(".env") ? fs.appendFileSync(".env", `\n//Loglib\nLOGLIB_USERNAME=${username.username}\nLOGLIB_PASSWORD=${password.password}\nLOGLIB_SECRET=${res.secret}`) : fs.writeFileSync(".env", `LOGLIB_USERNAME=${username.username}\nLOGLIB_PASSWORD=${password.password}\nLOGLIB_SECRET=${res.secret}`)
        return true
    }
    return false
}