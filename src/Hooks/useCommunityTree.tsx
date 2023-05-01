

import { faFire, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { communityData } from "State/Data"
import Avatar from "Stories/Bits/Avatar/Avatar"
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


const useCommunityTree = () => {

    const data: any = useRecoilValue(communityData)

    const [tree, setTree] = useState([])

    console.log('data', data)

    // useEffect(() => {

    //     let result: any = []

    //     data.forEach((group: any, iter1: number) => {

    //         let children: any = []

    //         group.items.forEach((item: any, iter2: number) => {
    //             children.push({
    //                 type: 'leaf',
    //                 visibility: true,
    //                 path: `${iter1}.${iter2}`,
    //                 id: item.public_id,
    //                 name: item.title,
    //                 link: `/c/${item.public_id}`,
    //                 icon: <Avatar size='small' public_id={item.public_id} />,
    //                 ...item
    //             })
    //         })


    //         result.push({
    //             path: iter1,
    //             id: group.id,
    //             type: 'group',
    //             active: true,
    //             name: group.title,
    //             children: children,
    //             link: false,
    //             ...group,
    //         })
    //     })

    //     setTree(result)

    // }, [data])





    return [tree, setTree]
}





export default useCommunityTree




