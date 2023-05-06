import { type } from 'os'
import { atom } from 'recoil'


export const socketFlow = atom({
    key: 'socketFlow',
    default: {},
})

export const contentFlow = atom({
    key: 'contentFlow',
    default: {
        type: null,
        public_id: null,
        title: null,
        roleSet: {},
    } as any,
})

export const errorFlow = atom({
    key: 'errorFlow',
    default: {
        type: null as any,
        message: null as any,
    },
})

export const authFlow = atom({
    key: 'authFlow',
    default: 'login' as authFlow
})

export const pageFlow = atom({
    key: 'pageFlow',
    default: 'home' as pageFlow
})

type pageFlow = 'home' | 'trending' | 'community'

type authFlow = 'login' | 'signup' | 'verify' | 'auth'

export const portalControlFlow = atom({
    key: 'portalControlFlow',
    default: {} as any,
})



