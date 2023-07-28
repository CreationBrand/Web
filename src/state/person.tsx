import BitSet from "bitset"
import { atom } from "recoil"

export const person = atom({
    key: 'person',
    default: false as any
})

export const globalHex = atom({
    key: 'globalHex',
    default: new BitSet('00000') as any
})

export const globalRole = atom({
    key: 'globalRole',
    default: false as any

})

export const communityList = atom({
    key: 'communityList',
    default: false as any
})

export const communityTree = atom({
    key: 'communityTree',
    default: false as any
})

export const messengerTree = atom({
    key: 'messengerTree',
    default: false as any
})