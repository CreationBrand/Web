import { atom, selector } from "recoil";

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