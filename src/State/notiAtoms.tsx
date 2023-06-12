//@ts-nocheck

import { atom, atomFamily, selector } from "recoil";

// FOR EVERYTHING ELSE
export const notiSync = atomFamily({
    key: 'notiSync',
    default: {} as any,
})

export const resetAllAtoms = selector({
    key: 'resetNotiAtoms',
    get: ({ get }) => {
        const atomKeys = Object.keys(notiSync).filter((key) =>
            key.includes(notiSync.key)
        );
        const initialValues = atomKeys.reduce((acc, key) => {
            acc[key] = get(notiSync(key)).default;
            return acc;
        }, {});

        return initialValues;
    },
    set: ({ set }, newValue) => {
        Object.entries(newValue).forEach(([key, value]) =>
            set(notiSync(key), value)
        );
    },
});



export const notiList = atom({
    key: 'notiList',
    default: [] as any,
})


