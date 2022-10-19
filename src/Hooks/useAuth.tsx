import { useState, useEffect } from 'react'
// import { refreshSession } from "Services/cognito";
import { verifyCognito } from 'Service/Cognito'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { get } from 'Service/Request'
import {
    messengerState,
    personState,
    communityState,
    roleState
} from 'State/atoms'
import { connectSocket } from 'Service/Socket'
// import { socketAuth } from "Services/socket";

var useAuth = () => {
    let navigate = useNavigate()
    const [isAuth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const setM = useSetRecoilState(messengerState)
    const setP = useSetRecoilState(personState)
    const setC = useSetRecoilState(communityState)
    const setR = useSetRecoilState(roleState)

    useEffect(() => {
        var trySession = async () => {
            try {
                let session = await verifyCognito()
                if (!session) {
                    setLoading(false)
                } else {
                    await connectSocket()
                    var request = await get('user')

                    if (request !== false) {
                        // socketAuth(request);
                        setM(request.messengers)
                        setP(request.person)
                        setC(request.communitys)
                        setR(request.roles)
                        setAuth(true)
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                }
            } catch (e) {
                console.log('catched', e)

                setLoading(false)
            }
        }

        trySession()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [isAuth, loading]
}
export { useAuth }
