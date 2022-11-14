import { atom } from 'recoil'


// stores auth data
export const sessionData = atom({
    key: 'sessionData',
    default: {} as any,
})

export const globalRoleData = atom({
    key: 'globalRoleData',
    default: {} as any,
})

export const communityData = atom({
    key: 'communityData',
    default: [],
})
