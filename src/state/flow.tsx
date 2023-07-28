import { atom } from "recoil"
import { localStorageEffect } from "./Effects"

export const authFlow = atom({
    key: 'authFlow',
    default: 'guest' as authFlow
})

type authFlow = 'user' | 'guest'

export const socketFlow = atom({
    key: 'socketFlow',
    default: 'loading' as 'loading' | 'error' | 'connected' | 'disconnected',
})

export const contentFlow = atom({
    key: 'contentFlow',
    default: null as contentFlow | null,
})

type contentFlow = 'post' | 'comment' | 'community' | 'global' | 'group' | 'person' | 'messenger' | 'settings' | 'submit' | 'notifications' | 'search' | 'searchCommunity' | 'editCommunity' | 'editPerson' | 'editPost' | 'editComment' | 'editGroup' | 'editMessenger' | 'editSettings' | 'editSubmit' | 'editNotifications' | 'editSearch' | 'editSearchCommunity' | 'editGlobal' | 'editGroup' | 'editPerson' | 'editMessenger' | 'editSettings' | 'editSubmit' | 'editNotifications' | 'editSearch' | 'editSearchCommunity' | 'editGlobal'


export const errorFlow = atom({
    key: 'errorFlow',
    default: {
        type: null as any,
        message: null as any,
    },
})


export const filterFlow = atom({
    key: 'filterFlow',
    default: [
        // "0af35853-3768-490d-a727-9dcfae3b8e77",
        "b9b4f081-4e0f-4ef2-912d-00e34810febd",
        "0a7ccced-2525-44fd-86bd-899b1108e9f1"
    ] as any,
    effects_UNSTABLE: [localStorageEffect('filterFlow')],
})

