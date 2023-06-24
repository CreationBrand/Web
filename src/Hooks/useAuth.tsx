import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { get } from 'Service/Request'

import {
    communityData,
    communityListData,
    communityTreeData,
    globalHex,
    globalRoleData,
    messengerData,
    messengerTreeData,
    personData,
    sessionData,
    tagData
} from 'State/Data'
import { buildHex, communityLTL, communityLTT, messengerLTT } from 'Helper/Clean'
import { authFlow } from 'State/Flow'
import useSession from './Util/useSession'
import { timeStart, timeEnd, log, logStatus } from 'Util/logging'
var treeify = require('treeify');


var useAuth = () => {

    const [isAuth, setAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    //SET GLOBAL STATE
    const setC = useSetRecoilState(communityData)
    const setP = useSetRecoilState(personData)
    const setR = useSetRecoilState(globalRoleData)
    const setT = useSetRecoilState(tagData)

    // UPDATED
    const setCTD = useSetRecoilState(communityTreeData)
    const setCLD = useSetRecoilState(communityListData)
    const setMTD = useSetRecoilState(messengerTreeData)
    const setAF = useSetRecoilState(authFlow)
    const setHex = useSetRecoilState(globalHex)


    const session = useSession()

    useEffect(() => {
        // if (!session) {
        //     setAuth(false)
        //     setLoading(false)
        //     return
        // };

        (async () => {
            var request = await get('user')

            if (request === false) {
                logStatus('REST', 'User Data', false);
                setAuth(false)
                setLoading(false)

                return
            }
            logStatus('REST', 'User Data', true);

            timeStart('STATE', 'Ingest User Data')
            setAF('user')
            setP(request.person)
            setMTD(messengerLTT(request.messengers))
            setC(request.communitys)
            setCTD(communityLTT(request.communitys))
            setCLD(communityLTL(request.communitys))
            setR(request.globalRoles)
            setHex(buildHex(request.globalRoles))
            setT(request.tags)
            setAuth(true)
            setLoading(false)
            timeEnd('STATE', 'Ingest User Data')
        })();


    }, [session])



    return [isAuth, isLoading]
}
export default useAuth
