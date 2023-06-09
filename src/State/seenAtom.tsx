import { atom, selector } from "recoil";



export const seenAtom = atom({
    key: 'seenAtom',
    default: [] as any,
});


export const hasSeen = selector({
    key: 'hasSeenPublicId',
    get: ({ get }) => {
        const publicIds = get(seenAtom);
        return (publicId: any) => publicIds.includes(publicId);
    },
});


export const see = selector({
    key: 'checkAndAddPublicId',
    get: ({ get }) => {
        const publicIds = get(seenAtom);
        return (publicId: any) => publicIds.includes(publicId);
    },
    set: ({ set }, newValue) => {
        const publicId = newValue;
        set(seenAtom, (prevPublicIds: any) => [...prevPublicIds, publicId]);
    },
});