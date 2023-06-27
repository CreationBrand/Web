import { atomFamily, selector } from "recoil";

export const communitySync = atomFamily({
    key: 'commentSync',
    default: {} as any,
})
