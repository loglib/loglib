import { Route } from "../../type";
import { getDashboardData } from "./get";


export const dashboardRoutes: Route = {
    GET: getDashboardData,
    meta: {
        auth: true
    }
}