/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { xsMuted } from "Stories/Bits/Text/Text"



const C = {
    container: css({
        position: 'absolute',
        bottom: '10px',
        right: '20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
    }),
    error: css({
        marginLeft:'4px',
        width: '8px',
        height: '8px',
        borderRadius: '100%',
        border: '2px solid #b03228',
    }),
    active: css({
        marginLeft:'4px',
        width: '8px',
        height: '8px',
        borderRadius: '100%',
        border: '2px solid #28b053',
    }),

}


const ServerStatus = () => {

    return (<div css={C.container}>

        <div css={C.active} /><a css={xsMuted}>Auth Api</a>
        <div css={C.error} /><a css={xsMuted}>Rest Api</a>
        <div css={C.error} /><a css={xsMuted}>Socket Api</a>



    </div>)
}




export default ServerStatus