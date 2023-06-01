import { type } from 'os'
import { atom } from 'recoil'
import { localStorageEffect } from './Effects'


export const socketFlow = atom({
    key: 'socketFlow',
    default: 'loading' as 'loading' | 'error' | 'connected' | 'disconnected',
})

export const contentFlow = atom({
    key: 'contentFlow',
    default: null as contentFlow | null,
})

type contentFlow = 'post' | 'comment' | 'community' | 'global' | 'group'

export const errorFlow = atom({
    key: 'errorFlow',
    default: {
        type: null as any,
        message: null as any,
    },
})

export const authFlow = atom({
    key: 'authFlow',
    default: 'guest' as authFlow
})

export const pageFlow = atom({
    key: 'pageFlow',
    default: 'home' as pageFlow
})

type pageFlow = 'home' | 'trending' | 'community'

type authFlow = 'user' | 'guest' | 'admin'

export const portalControlFlow = atom({
    key: 'portalControlFlow',
    default: {} as any,
})



export const communityFlow = atom({
    key: 'communityFlow',
    default: null as communityF | null,

})


interface communityF {
    public_id: string;
    title: string;
    roleHex: string;
    allRoles: any;
    yourRoles: any;
}


export const filterFlow = atom({
    key: 'filterFlow',
    default: [] as any,
    effects_UNSTABLE: [localStorageEffect('filterFlow')],
})



export const postFilterFlow = atom({
    key: 'postFilterFlow',
    default: "HOT" as any,
    effects_UNSTABLE: [localStorageEffect('postFilterFlow')],
})

