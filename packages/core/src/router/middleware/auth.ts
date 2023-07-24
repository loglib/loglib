import jwt from "jsonwebtoken";
import { Middleware } from "./type";

export const authMiddleware: Middleware = async (req, options, next) => {
  if (!options.auth) return await next(req, options);
  const { authorization } = req.headers as { authorization: string };
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    try {
      jwt.verify(token, options.auth.secret);
    } catch {
      return { message: "Unauthorized", code: 401 };
    }
    return await next(req, options);
  } else {
    return { message: "Unauthorized", code: 401 };
  }
};
