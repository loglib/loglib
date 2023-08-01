import { atom } from "jotai";
import { WebsiteWithSessions } from "./types";
import { Teams } from "@/server/query";
import { User } from "next-auth";

export const userAtom = atom<(User & { id: string }) | null>(null);
export const trackerModalAtom = atom(false);
export const websiteFormAtom = atom(false);
export const websiteDeleteModalAtom = atom(false);
export const apiKeyGenerateModalAtom = atom(false);
export const websitesAtom = atom<WebsiteWithSessions[]>([]);
export const createTeamModalAtom = atom(false);
export const inviteTeamModalAtom = atom(false);
export const leaveTeamModalAtom = atom(false);
export const teamSitesModalAtom = atom(false);
export const userWebsitesAtom = atom<WebsiteWithSessions[]>([]);
export const teamWebsitesAtom = atom<WebsiteWithSessions[]>([]);
export const teamsAtom = atom<Teams>([]);
export const selectedTeamAtom = atom<Teams[0] | null>(null);
