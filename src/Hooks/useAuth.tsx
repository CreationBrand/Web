import { useState, useEffect } from 'react'
// import { refreshSession } from "Services/cognito";
import { verifyCognito } from 'Service/Cognito'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { get } from 'Service/Request'

import { connectSocket } from 'Service/Socket'
import {
    communityData,
    communityListData,
    communityTreeData,
    globalRoleData,
    messengerData,
    messengerTreeData,
    personData,
    sessionData
} from 'State/Data'
import { communityLTL, communityLTT, messengerLTT } from 'Helper/Clean'

var treeify = require('treeify');

// import { socketAuth } from "Services/socket";

var useAuth = () => {
    let navigate = useNavigate()

    const [isAuth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    //SET GLOBAL STATE
    const setC = useSetRecoilState(communityData)
    const setSession = useSetRecoilState(sessionData)
    const setP = useSetRecoilState(personData)
    const setR = useSetRecoilState(globalRoleData)
    const setM = useSetRecoilState(messengerData)

    // UPDATED
    const setCTD = useSetRecoilState(communityTreeData)
    const setCLD = useSetRecoilState(communityListData)

    const setMTD = useSetRecoilState(messengerTreeData)

    useEffect(() => {
        var trySession = async () => {
            try {
                let session = await verifyCognito()
                if (!session) {
                    console.log('%c [SESSION] ', 'background: #000; color: #bada55', 'Invalid Session Token');
                    setLoading(false)
                } else {
                    await setSession(session)
                    await connectSocket()
                    var request = await get('user')

                    if (request !== false) {

                        // DATA SUPPLY
                        setP(request.person)
                        console.groupCollapsed('%c [DATA - person] ', 'background: #000; color: #5555da');
                        console.log(treeify.asTree(request.person, true));
                        console.groupEnd();

                        setMTD(messengerLTT(request.messengers))
                        console.groupCollapsed('%c [DATA - messengers] ', 'background: #000; color: #5555da');
                        console.log(treeify.asTree(request.messengers, true));
                        console.groupEnd();

                        setC(request.communitys)
                        setCTD(communityLTT(request.communitys))
                        setCLD(communityLTL(request.communitys))
                        console.groupCollapsed('%c [DATA - communitys] ', 'background: #000; color: #5555da');
                        console.log(treeify.asTree(request.communitys, true));
                        console.groupEnd();

                        setR(request.globalRoles)
                        console.groupCollapsed('%c [DATA - globalRoles] ', 'background: #000; color: #5555da');
                        console.log(treeify.asTree(request.globalRoles, true));
                        console.groupEnd();


                        setAuth(true)
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                }
            } catch (e) {
                setLoading(false)
            }
        }

        trySession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [isAuth, loading]
}
export default useAuth
