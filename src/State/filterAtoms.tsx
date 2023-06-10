import { atom } from "recoil";
import { localStorageEffect } from "./Effects";



export const personFilter = atom({
    key: "personFilter",
    default: 'POSTS',
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