//@ts-nocheck

import { atom, atomFamily, selector, selectorFamily } from "recoil";


// FOR ACTIVE TOGGLE COMMENTS
export const commentAtom = atom({
    key: 'commentAtom',
    default: [] as any,
});

export const pathSelector = selector({
    key: 'pathSelector',
    get: ({ get }) => get(commentAtom),
    set: ({ get, set }, newPath) => {
        const currentArray = get(commentAtom);

        // Check if the path already exists in the array
        const pathIndex = currentArray.findIndex((path: any) => path === newPath);

        if (pathIndex > -1) {
            // Path exists, remove it from the array
            const updatedArray = [...currentArray.slice(0, pathIndex), ...currentArray.slice(pathIndex + 1)];
            set(commentAtom, updatedArray);
        } else {
            // Path doesn't exist, add it to the array
            const updatedArray = [...currentArray, newPath];
            set(commentAtom, updatedArray);
        }
    },
});

export const pathExistsSelector = selector({
    key: 'pathExistsSelector',
    get: ({ get }) => {
        const currentArray = get(commentAtom);
        return (path: any) => {
            let res: any = false
            if (currentArray.includes(path)) res = 'active';
            for (let i = 0; i < currentArray.length; i++) {
                if (path.includes(currentArray[i]) && currentArray[i].length < path.length) res = 'invisible';
            }
            return res;
        }
    },
});


// FOR EVERYTHING ELSE
export const commentSync = atomFamily({
    key: 'commentSync',
    default: {} as any,
})

export const resetAllAtoms = selector({
    key: 'resetAllAtoms',
    get: ({ get }) => {
        const atomKeys = Object.keys(commentSync).filter((key) =>
            key.includes(commentSync.key)
        );
        const initialValues = atomKeys.reduce((acc, key) => {
            acc[key] = get(commentSync(key)).default;
            return acc;
        }, {});

        return initialValues;
    },
    set: ({ set }, newValue) => {
        Object.entries(newValue).forEach(([key, value]) =>
            set(commentSync(key), value)
        );
    },
});


export const setVisibilityByPath = selectorFamily({
    key: 'setVisibilityByPath',
    get: () => ({ get }) => {
        return;
    },
    set: (param) => ({ set, get }) => {

        let temp = get(commentList)
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].props.path === param.dynamicPath) {
                const atomValue = get(commentSync(temp[i].props.public_id));

                const updatedValue = {
                    ...atomValue,
                    active: param.status,
                };
                set(commentSync(temp[i].props.public_id), updatedValue);
            }

            else if (temp[i].props.path.includes(param.dynamicPath)) {
                const atomValue = get(commentSync(temp[i].props.public_id));

                const updatedValue = {
                    ...atomValue,
                    visibility: !param.status,
                };
                set(commentSync(temp[i].props.public_id), updatedValue);

            }

        }

    },
});

export const commentList = atom({
    key: 'commentList',
    default: [] as any,
})


