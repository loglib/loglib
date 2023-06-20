import z from "zod"
import { ApiPostHandler } from "../../type"
import jwt from "jsonwebtoken"


const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})



const login: ApiPostHandler<z.infer<typeof loginSchema>, any> = async (req, options) => {
    const body = loginSchema.safeParse(req.body)
    if (body.success) {
        const { username, password } = body.data
        if (process.env.LOGLIB_USERNAME !== username || process.env.LOGLIB_PASSWORD !== password) {
            return { message: "Invalid username or password", code: 400 }
        } else {
            if (options.auth) {
                const token = jwt.sign({ username, password }, options.auth.secret, {
                    expiresIn: options.auth.expiresIn ?? 172800 //2days
                })
                return { message: "success", code: 200, data: { token } }
            }
            return { message: "success", code: 200 }
        }
    }
    else {
        return { message: "Invalid username or password", code: 400 }
    }
}

export { login }