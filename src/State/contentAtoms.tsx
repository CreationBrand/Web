import { atom } from "recoil";


export const autoPlayAtom = atom({
    key: 'autoPlayAtom',
    default: true as any,
});

export const muteAtom = atom({
    key: 'muteAtom',
    default: false as any,
});