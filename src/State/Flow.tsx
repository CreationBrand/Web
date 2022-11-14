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
        type: null,
        message: null,
    },
})

export const authFlow = atom({
    key: 'authFlow',
    default: 'login' as authFlow
})

type authFlow = 'login' | 'signup' | 'verify' | 'auth'

