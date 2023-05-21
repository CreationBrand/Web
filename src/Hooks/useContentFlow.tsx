import { contentFlow } from "State/Flow";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useContentFlow = (type: any) => {
    const setContentFlow = useSetRecoilState(contentFlow)
    useEffect(() => {
        setContentFlow(type)
        return () => setContentFlow(type)
    }, [type]);
}

export default useContentFlow