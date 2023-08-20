import { Teams } from "@/server/query";
import { Website } from "@prisma/client";
import { atom } from "jotai";
import { User } from "next-auth";
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atom<(User & { id: string }) | null>(null);
export const trackerModalAtom = atom(false);
export const websiteFormAtom = atom(false);
export const websiteDeleteModalAtom = atom(false);
export const apiKeyGenerateModalAtom = atom(false);
export const websitesAtom = atom<(Website & { visitors: number })[]>([]);
export const createTeamModalAtom = atom(false);
export const inviteTeamModalAtom = atom(false);
export const leaveTeamModalAtom = atom(false);
export const teamSitesModalAtom = atom(false);
export const userWebsitesAtom = atom<(Website & { visitors: number })[]>([]);
export const teamWebsitesAtom = atom<(Website & { visitors: number })[]>([]);
export const teamsAtom = atom<Teams>([]);
export const selectedTeamAtom = atom<Teams[0] | null>(null);

export const localSettingAtom = atomWithStorage<{
    graph: string | null,
    timezone: string | null,
}>("setting", {
    graph: null,
    timezone: null
})
export const celebrateSettingAtom = atomWithStorage("c-setting", {
    uniqueVisitors: 100,
    lastShown: 0,
    enabled: false
})