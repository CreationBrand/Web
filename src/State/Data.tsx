import BitSet from 'bitset'
import { atom, atomFamily, selectorFamily, useRecoilCallback, useRecoilState } from 'recoil'

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
export const commentTreeData = atom({
    key: 'commentTreeData',
    default: []
})


export const postListData = atom({
    key: 'postListData',
    default: [] as any,
})

export const messageListData = atom({
    key: 'messengerListData',
    default: []
})

// FAMILY?




// (UPDATED) TREES

// for groups
export const communityTreeData = atom({
    key: 'communityTreeData',
    default: []
})
export const communityListData = atom({
    key: 'communityListData',
    default: []
})


export const tagData = atom({
    key: 'tagData',
    default: []
})





export const messengerTreeData = atom({
    key: 'messengerTreeData',
    default: []
})



export const layoutSizeData = atom({
    key: 'layoutSizeData',
    default: 'desktop' as 'desktop' | 'mobile'
})



export const virtualListStateFamily = atomFamily({
    key: 'virtualList',
    default: {} as any,
})

export const virtualItem = atom({
    key: "virtualItem",
    default: {} as any,
});



export const globalHex = atom({
    key: 'globalHex',
    default: new BitSet('00000') as any
})



// notif

export const notificationStateFamily = atomFamily({
    key: 'notificationState',
    default: false as any,
})

export const notification = atom({
    key: "notification",
    default: {} as any,
});
