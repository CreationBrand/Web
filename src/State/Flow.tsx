import { atom } from 'recoil'

// export const appFlow = atom({
//     key: 'appFlow',
//     default: {
//       auth: authFlow

//     },
// })

export const socketFlow = atom({
    key: 'socketFlow',
    default: {},
})



export const authFlow = atom({
    key: 'authFlow',
    default: 'login' as authFlow
})

type authFlow = 'login' | 'signup' | 'verify' | 'auth'

