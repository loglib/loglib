import { Website } from '@prisma/client'
import { atom } from 'jotai'


export const editFormModalAtom = atom(false)
export const trackerModalAtom = atom(false)
export const websiteFormAtom = atom(false)
export const websiteDataAtom = atom<Website | null>(null)
export const websiteDeleteModalAtom = atom(false)
export const apiKeyGenerateModalAtom = atom(false)
export const websitesAtom = atom<Website[]>([])