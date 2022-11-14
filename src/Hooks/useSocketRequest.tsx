import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { socketFlow } from "State/Flow";


const useSocketRequest = (event: string, message: object,skip?:boolean) => {

    // const [loading, setLoading] = useState(true)
    const socket:any = useRecoilValue(socketFlow);

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData]:any = useState(false)

    useEffect(() => { 
        if(skip) return;
        
        if(socket !== null && socket !== undefined && socket.connected){
            socket.emit(event, message, (data: any) => {
                if(data.error){
                    setError(data.error)
                }else{
                    setData(data)
                }
                setLoading(false)
            })
        }
  
    }, [JSON.stringify(message)])


    return [error, loading, data] as const;
}

export default useSocketRequest