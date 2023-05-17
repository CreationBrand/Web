import { socketRequest } from "Service/Socket";
import MainPost from "Stories/Chunk/Post/MainPost";
import { useQuery } from "@tanstack/react-query";

const usePullPost = (post_id: any) => {

    const { isLoading, isError, data, error } = useQuery({
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
        }
    })

    return [isLoading, isError, <MainPost varient="post" {...data?.post} />, data];
}

export default usePullPost
