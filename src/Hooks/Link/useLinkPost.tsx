import { useEffect, useState } from "react"
import { socket } from "Service/Socket";


const useLinkPost = (post_id: string, active: boolean) => {

    useEffect(() => {
        // if (!post_id || !active) return

        console.log('link-post', { post_id, active: true })
        socket.emit('link-post', { post_id, active: true })

        function deltaEvent(value: any) {
            console.log('link-post', value)
            if (!value || value === undefined) return null
            // setData(value)
            console.log(value)
        }


        socket.on('link-post', deltaEvent);
        return () => {
            console.log('link-post', { post_id, active: false })

            socket.emit('link-post', { post_id, active: false })
            socket.off('link-post', deltaEvent);
        };
    }, [active]);


}

export default useLinkPost