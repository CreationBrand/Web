import { communityLTT, communityLTL, buildHex } from '@/service/Clean'
import { getSession } from '@/service/Cognito'
import { get } from '@/service/Request'
import { authFlow } from '@/state/flow'
import { communityList, communityTree, globalHex, globalRole, person } from '@/state/person'
import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'



var useAuth = () => {

    const [isAuth, setAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const setP = useSetRecoilState(person)
    const setHex = useSetRecoilState(globalHex)
    const setRoles = useSetRecoilState(globalRole)
    const setCList = useSetRecoilState(communityList)
    const setCTree = useSetRecoilState(communityTree)
    const setAF = useSetRecoilState(authFlow)

    useEffect(() => {
        (async () => {
            let session = await getSession();

            if (!session) {
                setAuth(false)
                setLoading(false)
                return
            }


            var request = await get('user')

            if (request === false) {
                setAuth(false)
                setLoading(false)
                return
            }

            setHex(buildHex(request.globalRoles))
            setP(request.person)
            setRoles(request.globalRoles)
            setCTree(communityLTT(request.communitys))
            setCList(communityLTL(request.communitys))
            setAF('user')
            setAuth(true)
            setLoading(false)
        })();


    }, [])


    return [isAuth, isLoading]
}
export default useAuth
