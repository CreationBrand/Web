import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { communityData } from "State/Data"

const useCommunityArray = () => {

    const communitys = useRecoilValue(communityData)
    const [communityArray, setCommunityArray]: any = useState([])

    useEffect(() => {
        let temp: any = []
        let iter = communitys.map((c: any) => {
            return c.items.map((i: any) => {
                temp.push(i)
                return i
            })
        })
        setCommunityArray(temp)
    }, [communitys])


    return communityArray
}



export default useCommunityArray