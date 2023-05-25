import { memo, useEffect } from "react"



const Loading = ({ onEnd}: any) => {

    useEffect(() => {
        onEnd()
    }, [])

    return <div key={'endd'}>END</div>
}


export default memo(Loading)