import { Events, PageView, Session, User } from "@loglib/core";

export interface APIResponse {
    user: User[];
    pageView: PageView[],
    events: Events[],
    session: Session[]
}