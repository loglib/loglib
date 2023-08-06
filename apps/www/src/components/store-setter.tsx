"use client";

import {
    teamWebsitesAtom,
    teamsAtom,
    userAtom,
    userWebsitesAtom,
    websitesAtom,
} from "@/jotai/store";
import { useAtom } from "jotai";

const stores = {
    website: websitesAtom,
    teamWebsites: teamWebsitesAtom,
    userWebsites: userWebsitesAtom,
    user: userAtom,
    teams: teamsAtom,
};
type Stores = typeof stores;

export function StoreSetter<T extends keyof Stores, K extends Stores[T]["init"]>({
    store,
    data,
}: { store: T; data: K }) {
    const [, setData] = useAtom(stores[store]);
    // @ts-ignore //it give us what we want which is typing the input it's okay to ignore this for staying sane
    setData(data);
    return null;
}
