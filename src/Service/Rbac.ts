import { globalHex } from "State/Data";
import BitSet from "bitset";
import { get } from "http";
import { boolean } from "joi";
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

export const canManageCommunity = (set: any) => {

    //global
    let gHex = getRecoil(globalHex)
    if (Boolean(gHex.get(1) !== 0)) return true
    if (set === null) return false
    //community

    let bs = new BitSet(set)
    if (Boolean(bs.get(1) !== 0)) return true


    return false
};

export const canManageGlobalRole = () => {
    let gHex = getRecoil(globalHex)
    let bs = new BitSet(gHex)
    return Boolean(bs.get(3) !== 0)
};

export const isAdmin = (set: any) => {
    if (set === null) return false

    let bs = new BitSet(set)
    if (Boolean(bs.get(0) !== 0)) return true

    return false
};
