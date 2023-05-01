

import { faFire, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { messengerData, messengerTreeData } from "State/Data"
import Avatar from "Stories/Bits/Avatar/Avatar"
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


const useMessengerTree = () => {

    const messengers = useRecoilValue(messengerTreeData)

    const [tree, setTree] = useState([
        {
            id: '0',
            type: 'branch',
            path: '0',
            title: 'FEEDS',
            active: true,
            visible: true,
            children: [
                {
                    id: "trending",
                    type: 'leaf',
                    path: '0.0',
                    link: '/trending',
                    active: true,
                    visible: true,
                    object: {
                        id: "trending",
                        title: "Trending",
                   
                        icon: <FontAwesomeIcon size='1x' icon={faFire} />
                    },
                }, {
                    id: "home",
                    type: 'leaf',
                    link: '/home',
                    path: '0.1',
                    active: true,
                    visible: true,
                    object: {
                        id: "home",
                        title: "Home",
                        
                        icon: <FontAwesomeIcon size='1x' icon={faHouse} />
                    }
                }

            ],
        },
        {
            id:'1',
            type: 'branch',
            path: '0.1',
            title: 'DIRECTS MESSAGES',
            active: true,
            visible: true,
            children: [{
                id: 'filter',
                type: 'component',
                path: '0.1',
                title: 'DIRECTS MESSAGES"',
                active: true,
                visible: true,
                component: <MessengerFilter />
            }, ...messengers],
        }


    ])

    return tree
}




export default useMessengerTree


