import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { postSync } from "State/postAtoms";


const usePostLive = (active: boolean, props: any) => {

    const [data, setData] = useRecoilState(postSync(props.public_id))

    useEffect(() => {
        if (!props.public_id || !active) return

        socket.emit(`subscribe:${props.public_id}`, true)

        function subscribe(value: any) {


            if (!value || value === undefined) return null

            const clone = { ...data };

            if (value?.view) {

                setData((prevState: any) => ({
                    ...prevState,
                    views: Number(data.views) + Number(value.view),
                }));

            }
            else if (value?.vote) {
                clone.vote = Number(clone.vote) + Number(value.vote)
                setData(clone)

                // setData((prevState: any) => ({
                //     ...prevState,
                //     vote: Number(clone.vote) + Number(value.vote),
                // }));


            }
            else if (value?.comment) {
                clone.comment = Number(clone.comment) + Number(value.comment)
                setData(clone)
            }
            else if (value?.tags) {
                // console.log('tags', value.tags)

                clone.tags = value.tags
                setData(clone)
            }
            else if (value.community_roles !== undefined) {
                setData((prevState: any) => ({
                    ...prevState,
                    community_roles: value.community_roles,
                }));
            }
        }
        socket.on(`subscribe:${props.public_id}`, subscribe);
        return () => {
            socket.emit(`subscribe:${props.public_id}`, false)
            socket.off(`subscribe:${props.public_id}`, subscribe);
        };
    }, [active]);

    return data
}

export default usePostLive