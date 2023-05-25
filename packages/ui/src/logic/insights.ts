
import { User } from "@loglib/core"
import { filter } from "./filter"


const unqiueUsers = (data: User[],) => {
    filter(data).where("createdAt", "gte", new Date(new Date().getDate() - 1))
}
