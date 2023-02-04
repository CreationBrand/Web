/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const C = {
    container: css({
        width: '100%',
        height: '50px',
        maxHeight: '50px',
        minHeight: '50px',
        position: 'relative',
    }),
    wrapper: css({
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        height: 'auto',
        minHeight: '50px',
        transform: 'none',
    }),
    box: css({
        width: 'min-content',
        margin: '0 auto',
        height: '44px',
        minHeight: '44px',
        maxHeight: '44px',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        marginBottom: '8px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }),
    inner: css({
        display: 'flex',
        paddingLeft: '12px',
        paddingRight: '12px',
        alignItems: 'center',
        gap: '4px',
        justifyContent: 'space-between',
    }),
    panel: css({
        width: 'calc(100% - 40px)',
        borderRadius: '8px',
        height: 'auto',
        minHeight: '200px',
        background: '#343442',
        margin: '10px 20px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',

    }),
}





const ControlBar = () => {


    const navigate = useNavigate()

    return (

        <div css={C.container}>
asdf
        </div >

    )
}

export default ControlBar
