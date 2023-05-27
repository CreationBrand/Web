
import { socketRequest } from "Service/Socket";
import MainPost from "Stories/Chunk/Post/MainPost";
import { useQuery } from "@tanstack/react-query";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketFlow } from "State/Flow";
import { virtualListStateFamily } from "State/Data";

const usePullPost = (post_id: any) => {
    const socket = useRecoilValue(socketFlow)



    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(virtualListStateFamily(`subscribe:${listItems.public_id}`), listItems);
        },
        []
    );


    const { isLoading, isError, data, error } = useQuery({
        enabled: socket === 'connected',
        queryKey: ['post', post_id],
        queryFn: async () => {



            let req: any = await socketRequest('post', {
                post_id: post_id,
            })

            if (req === false || req.status === 'error') throw new Error('Network response was not ok')

            // console.groupCollapsed('%c [DATA - post] ', 'background: #000; color: #5555da');
            // console.log(data.post);
            // console.groupEnd();



            return req
        },
        onSuccess: (data) => {
            if (!data || data === undefined) return
            setListItems(data.post)
        },
    })

    return [isLoading, isError, <MainPost varient="post" {...data?.post} />, data];
}

export default usePullPost
