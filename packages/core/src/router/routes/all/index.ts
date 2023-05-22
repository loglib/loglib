import { Route } from "../../type";
import { getAllTables } from "./get";


export const insightsRoutes: Route = {
    GET: getAllTables
}