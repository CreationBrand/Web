import { verifyCognito } from "Service/Cognito"
import { sessionData } from "State/Data"
import { timeStart, timeEnd, log } from "Util/logging"
import { useEffect } from "react"
import { useRecoilState } from "recoil"



const useSession = () => {

    const [val, set] = useRecoilState(sessionData)


    useEffect(() => {

        (async () => {
            timeStart('SESSION', 'Verifying session')

            let session = await verifyCognito()
            if (!session) log('SESSION', 'Invalid Session Token');
            else {
                set(session)
            }
            timeEnd('SESSION', 'Verifying session')
        })()

    }, [])

    return val
}


export default useSession