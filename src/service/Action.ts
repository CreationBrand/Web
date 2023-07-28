import { socketRequest, socketRequestNoCache } from "@/hooks/util/useSocket";
import { setRecoil } from "recoil-nexus";
import { communityLTL, communityLTT } from "./Clean";
import { communityList, communityTree } from "@/state/person";

export const closeGroup = async (path: any, tree: any, setTree: any) => {

    let deepClone = JSON.parse(JSON.stringify(tree));

    for (var i in deepClone[path].children) {
        deepClone[path].children[i].visible = !deepClone[path].active
    }
    deepClone[path].active = !deepClone[path].active

    setTree(deepClone)
}



export const joinCommunity = async (public_id: any) => {
    await socketRequestNoCache('community-join', { community_id: public_id }, true)
    let req2: any = await socketRequestNoCache('community-list', {})
    setRecoil(communityList, communityLTL(req2.communities))
    setRecoil(communityTree, communityLTT(req2.communities))
}

export const leaveCommunity = async (public_id: any) => {
    await socketRequestNoCache('community-leave', { community_id: public_id }, true)
    let req2: any = await socketRequestNoCache('community-list', {})
    setRecoil(communityList, communityLTL(req2.communities))
    setRecoil(communityTree, communityLTT(req2.communities))
}