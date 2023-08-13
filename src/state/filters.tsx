import { atom, atomFamily } from "recoil";
import { localStorageEffect } from "./Effects";


export const personList = atom({
    key: "personList",
    default: [] as any,
});


export const personFilter = atom({
    key: "personFilter",
    default: 'POST',
    effects: [
        localStorageEffect('personFilter'),
    ]
});

export const commentFilter = atom({
    key: "commentFilter",
    default: 'HOT',
    effects: [
        localStorageEffect('commentFilter'),
    ]
});

export const postFilter = atom({
    key: "postFilter",
    default: 'HOT',
    effects: [
        localStorageEffect('postFilter'),
    ]
});


export const postStyle = atom({
    key: "postStyle ",
    default: 'CARD',
    effects: [
        localStorageEffect('postStyle'),
    ]
});

export const communityFilter = atomFamily({
    key: "communityFilter",
    default: 'BEST',
    effects: [
        localStorageEffect('communityFilter'),
    ]
});

export const lists = atomFamily({
    key: "lists",
    default: [],
});


export const searchList = atom({
    key: "searchList",
    default: [] as any,
});

