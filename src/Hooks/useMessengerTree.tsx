

import { faFire, faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { messengerData, messengerTreeData } from "State/Data"
import Avatar from "Stories/Bits/Avatar/Avatar"
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


const useMessengerTree = () => {

    const messengers = useRecoilValue(messengerTreeData)

    const [tree, setTree] = useState(messengers)

    return tree
}




export default useMessengerTree


