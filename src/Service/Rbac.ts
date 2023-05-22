import { globalHex } from "State/Data";
import BitSet from "bitset";
import { get } from "http";
import { boolean } from "joi";
import { getRecoil } from "recoil-nexus";


export const communityRoles = {
    manage_tags: 1,
    manage_roles: 2,
    manage_community: 3,
    admin: 4,
}

export const globalRoles = {
    manage_tags: 1,
    manage_communitys: 2,
    manage_users: 3,
    manage_roles: 4,
    admin: 5,
}

export const canManageTags = (set: any) => {


    if (set === null) return false
    let bs = new BitSet(set)


    return Boolean(bs.get(0) !== 0)
};

export const canManageRole = (set: any) => {
    if (set === null) return false
    let bs = new BitSet(set)
    return Boolean(bs.get(1) !== 0)
};

export const canManageCommunity = (set: any) => {
    if (set === null) return false
    let bs = new BitSet(set)
    return Boolean(bs.get(2) !== 0)
};

export const canManageGlobalRole = () => {
    let gHex = getRecoil(globalHex)
    let bs = new BitSet(gHex)
    return Boolean(bs.get(3) !== 0)
};