import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { postSync } from "State/postAtoms";


const usePostLive = (active: boolean, props: any) => {

    const [data, setData] = useRecoilState(postSync(props.public_id))


    return data
}

export default usePostLive