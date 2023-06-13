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
    default: [
        {
            "public_id": "45c0a62d-e6ed-4221-9d3c-4648952ed38a",
            "title": "Approved",
            "color": 5172346
        },
        {
            "public_id": "7412af0a-8065-41b4-8bb7-ff4269318d7e",
            "title": "Violation",
            "color": 16558909
        },
        {
            "public_id": "b9b4f081-4e0f-4ef2-912d-00e34810febd",
            "title": "Toxic",
            "color": 16533319
        },
        {
            "public_id": "0af35853-3768-490d-a727-9dcfae3b8e77",
            "title": "NSFW",
            "color": 16726244
        },
        {
            "public_id": "5e975cca-b6b8-40e5-afca-21d3156cecdf",
            "title": "Humor",
            "color": 14678600
        },
        {
            "public_id": "e1f23633-98ce-4eea-9f48-dd82b289a8c2",
            "title": "Political",
            "color": 10508287
        },
        {
            "public_id": "d5454a4c-950b-4927-bda3-cf1288c3125a",
            "title": "Media",
            "color": 5158652
        },
        {
            "public_id": "0a7ccced-2525-44fd-86bd-899b1108e9f1",
            "title": "Broken",
            "color": 13355979
        }
    ]
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
