import { Website } from '../../@prisma'
import { atom } from 'jotai'

export const trackerModalAtom = atom(false)
export const websiteFormAtom = atom(false)
export const websiteDeleteModalAtom = atom(false)
export const apiKeyGenerateModalAtom = atom(false)
export const websitesAtom = atom<Website[]>([])