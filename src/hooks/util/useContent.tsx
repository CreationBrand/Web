import { contentFlow } from "@/state/flow";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const useContent = () => {

    const location = useLocation()
    const setContentFlow = useSetRecoilState(contentFlow)

    useEffect(() => {
        let parts: any = location.pathname.split('/')
        switch (true) {
            case parts[1] === 'popular':
                return setContentFlow('global')
            case parts[1] === 'home':
                return setContentFlow('global')
            case parts[1] === 'search':
                return setContentFlow('search')
            case parts[1] === 'c' && parts[3] === 'search':
                return setContentFlow('searchCommunity')
            case parts[1] === 'c' && parts.length === 3:
                return setContentFlow('community')
            case parts[1] === 'c' && parts[3] === 'p':
                return setContentFlow('post')
            case parts[1] === 'c' && parts[3] === 'p' && parts[5] === 'c':
                return setContentFlow('comment')
            case parts[1] === 'g':
                return setContentFlow('group')
            case parts[1] === 'p':
                return setContentFlow('person')
            case parts[1] === 'm':
                return setContentFlow('messenger')
            case parts[1] === 'settings':
                return setContentFlow('settings')
            case parts[1] === 'submit':
                return setContentFlow('submit')
            case parts[1] === 'notifications':
                return setContentFlow('notifications')
        }
    }, [location.pathname]);


};


export default useContent;