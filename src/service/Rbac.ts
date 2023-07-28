import { authFlow } from "@/state/flow";
import { globalHex } from "@/state/person";
import BitSet from "bitset";
import { getRecoil } from "recoil-nexus";


export const communityRoles = {
    manage_tags: 0,
    manage_roles: 1,
    manage_community: 2,
    admin: 3,
}

export const globalRoles = {
    manage_tags: 0,
    manage_communitys: 1,
    manage_users: 2,
    manage_roles: 3,
    admin: 4,
}

export const canManageTags = (set: any) => {

    //global
    let gHex = getRecoil(globalHex)

    if (Boolean(gHex.get(0) !== 0)) return true

    if (set === null) return false

    //community
    for (var i = 0; i < set.length; i++) {
        let bs = new BitSet(set[i])
        if (Boolean(bs.get(0) !== 0)) return true
    }

    return false
};

export const canManageRole = (set: any) => {
    if (set === null) return false
    let bs = new BitSet(set)
    return Boolean(bs.get(1) !== 0)
};

// export const canManageCommunity = (set: any) => {

//     //global
//     let gHex = getRecoil(globalHex)
//     if (Boolean(gHex.get(1) !== 0)) return true
//     if (set === null) return false
//     //community

//     let bs = new BitSet(set)
//     if (Boolean(bs.get(1) !== 0)) return true


//     return false
// };

export const canManageGlobalRole = () => {
    let gHex = getRecoil(globalHex)
    let bs = new BitSet(gHex)
    return Boolean(bs.get(3) !== 0)
};

export const isAdmin = (set: any) => {
    const auth = getRecoil(authFlow)
    const gH = getRecoil(globalHex)
    if (auth !== 'user' || set === null) return false
    let bs = new BitSet(set)
    if (Boolean(bs.get(3) !== 0)) return true
    return false
};


export const canMovePost = (set: any) => {

    //global
    let gHex = getRecoil(globalHex)
    if (Boolean(gHex.get(1) !== 0)) return true
    if (set === null) return false
    //community

    let bs = new BitSet(set)
    if (Boolean(bs.get(2) !== 0)) return true


    return false
};



export const isMuted = (set: any) => {

    if (set === null) return false
    let bs = new BitSet(set)
    if (Boolean(bs.get(4) !== 0)) return true
    return false
};

export const isPublic = (set: any) => {
    if (set === null) return false
    let bs = new BitSet(`0x${set}`)
    if (Boolean(bs.get(5) !== 0)) return true
    return false
};



export const canManageCommunity = (communityHex: any) => {
    const auth = getRecoil(authFlow)
    const gH = getRecoil(globalHex)
    if (auth !== 'user' || !communityHex) return false
    if (Boolean(gH.get(1) !== 0)) return true
    let bs = new BitSet(communityHex)
    if (Boolean(bs.get(1) !== 0)) return true
    return false
}