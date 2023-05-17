import { useQuery } from "@tanstack/react-query";
import { socketRequest } from "Service/Socket";
import CommunityPane from "Stories/Chunk/CommunityPane/CommunityPane";

const usePullCommunity = (community_id: any) => {

    const { isLoading, isError, data, error } = useQuery({
        queryKey: [community_id],
        queryFn: async () => {
            let req: any = await socketRequest('community', {
                community_id: community_id,
            })

            if (req === false || req.status === 'error') throw new Error('Network response was not ok')

            return req
        }
    })
    return [isLoading, isError, <CommunityPane data={data?.community} />, data];
}

export default usePullCommunity