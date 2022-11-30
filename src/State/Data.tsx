import { atom, atomFamily, selectorFamily } from 'recoil'

// GLOBAL STATE
export const sessionData = atom({
    key: 'sessionData',
    default: {} as any
})

export const personData = atom({
    key: 'personData',
    default: {} as any
})

export const globalRoleData = atom({
    key: 'globalRoleData',
    default: {} as any
})

export const communityData = atom({
    key: 'communityData',
    default: []
})

export const messengerData = atom({
    key: 'messengerData',
    default: []
})

// LISTS

export const activeListData = atom({
    key: 'activeListData',
    default: [] as any
})

export const commentListData = atom({
    key: 'commentListData',
    default: []
})

export const postListData = atom({
    key: 'postListData',
    default: []
})

export const messageListData = atom({
    key: 'messengerListData',
    default: []
})

// FAMILY?

export const notificationStateFamily = atomFamily({
    key: 'notificationState',
    default: false as any,
})
