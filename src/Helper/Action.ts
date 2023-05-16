import { socketRequest } from "Service/Socket"
import { communityListData, communityTreeData } from "State/Data";
import { getRecoil, setRecoil } from "recoil-nexus";

import { communityLTL, communityLTT } from "./Clean";

export const vote = async (vote: number, type: string, public_id: string) => {

        const req = await socketRequest('vote', { vote, public_id })

        console.log(req)
}

export const createMessage = async (messenger_id: any, message: any) => {

        console.log(messenger_id, message)
        const req = await socketRequest('new-message', { messenger_id: messenger_id, content: message })
        console.log(req)
}

export const closeGroup = async (path: any, tree: any, setTree: any) => {

        let deepClone = JSON.parse(JSON.stringify(tree));

        for (var i in deepClone[path].children) {
                deepClone[path].children[i].visible = !deepClone[path].active
        }
        deepClone[path].active = !deepClone[path].active

        setTree(deepClone)
}



export const joinCommunity = async (public_id: any) => {
        const req = await socketRequest('community-join', { community_id: public_id })
        let req2: any = await socketRequest('community-list', {})
        setRecoil(communityListData, communityLTL(req2.communities))
        setRecoil(communityTreeData, communityLTT(req2.communities))
}

export const leaveCommunity = async (public_id: any) => {
        const req = await socketRequest('community-leave', { community_id: public_id })
        let req2: any = await socketRequest('community-list', {})
        setRecoil(communityListData, communityLTL(req2.communities))
        setRecoil(communityTreeData, communityLTT(req2.communities))
}