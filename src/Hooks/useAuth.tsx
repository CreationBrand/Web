import { useState, useEffect } from 'react'
// import { refreshSession } from "Services/cognito";
import { verifyCognito } from 'Service/Cognito'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { get } from 'Service/Request'

import { connectSocket } from 'Service/Socket'
import colorLog from 'Util/colorLog'
import {
    communityData,
    globalRoleData,
    messengerData,
    personData,
    sessionData
} from 'State/Data'

var treeify = require('treeify');

// import { socketAuth } from "Services/socket";

var useAuth = () => {
    let navigate = useNavigate()

    const [isAuth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    //SET GLOBAL STATE
    const setM = useSetRecoilState(messengerData)
    const setC = useSetRecoilState(communityData)
    const setSession = useSetRecoilState(sessionData)
    const setP = useSetRecoilState(personData)
    const setR = useSetRecoilState(globalRoleData)

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

                        setM(request.messengers)
                        console.groupCollapsed('%c [DATA - messengers] ', 'background: #000; color: #5555da');
                        console.log(treeify.asTree(request.messengers, true));
                        console.groupEnd();

                        setC(request.communitys)
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
                colorLog('[REST] Connection Failed', 'error')
                setLoading(false)
            }
        }

        trySession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [isAuth, loading]
}
export default useAuth
