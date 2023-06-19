import { useState, useEffect } from 'react'
import { verifyCognito } from 'Service/Cognito'
import { useSetRecoilState } from 'recoil'
import { get } from 'Service/Request'

import { connectSocket } from 'Service/Socket'
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
var treeify = require('treeify');


var useAuth = () => {

    const [isAuth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    //SET GLOBAL STATE
    const setC = useSetRecoilState(communityData)
    const setSession = useSetRecoilState(sessionData)
    const setP = useSetRecoilState(personData)
    const setR = useSetRecoilState(globalRoleData)
    const setM = useSetRecoilState(messengerData)
    const setT = useSetRecoilState(tagData)

    // UPDATED
    const setCTD = useSetRecoilState(communityTreeData)
    const setCLD = useSetRecoilState(communityListData)
    const setMTD = useSetRecoilState(messengerTreeData)
    const setAF = useSetRecoilState(authFlow)
    const setHex = useSetRecoilState(globalHex)

    useEffect(() => {
        var trySession = async () => {
            console.groupCollapsed('%c[SESSION] ', 'font-weight:bold; color: #bada55', 'Checking Session');

            try {
                let session = await verifyCognito()
                console.log('%c[SESSION] ', 'font-weight:bold; color: #bada55', 'Session Data', session);
                if (!session) {
                    console.log('%c[SESSION] ', 'font-weight:bold; color: #bada55', 'Invalid Session Token');
                    setLoading(false)
                } else {
                    await setSession(session)
                    await connectSocket()
                    var request = await get('user')
                    console.log('%c[SESSION] ', 'font-weight:bold; color: #bada55', 'USER', request);

                    if (request !== false) {
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
                        console.groupEnd();

                    } else {
                        console.groupEnd();
                        setLoading(false)
                    }
                }
            } catch (e) {
                console.log('%c [SESSION] ', 'background: #000; color: #bada55', e);
                console.groupEnd();
                setLoading(false)
            }
        }

        trySession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [isAuth, loading]
}
export default useAuth
