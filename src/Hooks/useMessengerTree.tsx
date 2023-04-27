

import { faFire, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { messengerData } from "State/Data"
import Avatar from "Stories/Bits/Avatar/Avatar"
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


const useMessengerTree = () => {

    const messengers = useRecoilValue(messengerData)

    const [tree, setTree] = useState([
        {
            id: "0",
            isBranch: true,
            name: "FEEDS",
            children: [
                {
                    id: "trending",
                    name: "Trending",
                    link: '/trending',
                    icon: <FontAwesomeIcon size='1x' icon={faFire} />
                },
                {
                    id: "home", name: "Home",
                    link: '/home',
                    icon: <FontAwesomeIcon size='1x' icon={faHouse} />
                },
            ],
        },
    ])



    useEffect(() => {


        let oldTree = tree
        let temp: any = [{
            id: 'filter',
            isComponent: true,
            component: <MessengerFilter />
        }]

        messengers.forEach((messenger: any) => {
            temp.push({
                id: messenger.public_id,
                name: messenger.person.nickname,
                link: `/m/${messenger.public_id}`,
                icon: <Avatar size='small' public_id={messenger.public_id} />,
                ...messenger
            })
        })

        oldTree[1] = {
            id: "1",
            isBranch: true,
            name: "DIRECTS MESSAGES",
            children: temp
        }
        setTree(oldTree)

    }, [messengers])









    return tree
}




export default useMessengerTree


