import { useQuery } from "@tanstack/react-query";
import { socketRequest } from "Service/Socket";
import { virtualListStateFamily } from "State/Data";
import CommunityPane from "Stories/Chunk/CommunityPane/CommunityPane";
import { on } from "events";
import { useRecoilTransaction_UNSTABLE } from "recoil";

const usePullCommunity = (community_id: any) => {



    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(virtualListStateFamily(`community:${listItems.community.public_id}`), listItems.community);
        },
        []
    );




    const { isLoading, isError, data, error } = useQuery({
        queryKey: [community_id],
        queryFn: async () => {
            let req: any = await socketRequest('community', {
                community_id: community_id,
            })

            if (req === false || req.status === 'error') throw new Error('Network response was not ok')

            return req
        },
        onSuccess: (data) => {
            if (!data || data === undefined) return
            setListItems(data)
        },
    })
    return [isLoading, isError, <CommunityPane public_id={data?.community?.public_id} />, data];
}

export default usePullCommunity