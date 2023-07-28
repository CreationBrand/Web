import { atom, atomFamily, selector, selectorFamily } from "recoil"

export const postSync = atomFamily({
    key: 'postSync',
    default: {} as any,
})

export const communitySync = atomFamily({
    key: 'communitySync',
    default: {} as any,
})

export const commentSync = atomFamily({
    key: 'commentSync',
    default: {} as any,
})


export const personSync = atomFamily({
    key: 'personSync',
    default: {} as any,
})


export const postList = atom({
    key: 'postList',
    default: [] as any,
})


export const notiList = atom({
    key: 'notiList ',
    default: [] as any,
})



export const commentList = atom({
    key: 'commentList',
    default: [] as any,
})

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

export const setVisibilityByPath = selectorFamily({
    key: 'setVisibilityByPath',
    get: () => ({ get }) => {
        return;
    },
    set: (param:any) => ({ set, get }) => {

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
