import { useQuery } from "@tanstack/react-query";
import { socketRequest } from "Service/Socket";
import { communityFlow } from "State/Flow";
import { useSetRecoilState } from "recoil";

const useCommunityFlow = (community_id: any) => {
    const setCommunityFlow = useSetRecoilState(communityFlow)

    const { } = useQuery({
        queryKey: [community_id],
        queryFn: async () => {


            if (!community_id) return false

            let req: any = await socketRequest('community', {
                community_id: community_id,
            })

            if (req === false || req.status === 'error') throw new Error('Network response was not ok')

            setCommunityFlow({
                public_id: req.community.public_id,
                title: req.community.title,
                roleHex: req.communityHex,
                allRoles: req.community.community_roles,
                yourRoles: req.community.your_roles,
            })

            return req
        }
    })
    return true;
}

export default useCommunityFlow