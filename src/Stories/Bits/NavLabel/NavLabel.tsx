/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { textBold, textLight } from 'Global/Mixins';

import { useRecoilValue } from 'recoil';
import { contentFlow } from 'State/Flow';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';


const C = {
    container: css({
        display: 'flex',
        color: '#b9bbbe',
        // flexDirection: 'column',
        whiteSpace: 'nowrap',
        // background:'#0f0e10',
        borderRadius: '12px',
        height: '40px',
        alignItems: 'center',
        ':hover': { color: '#fff' },
        cursor: 'pointer',
        justifyContent: 'center',
        gap: '4px',
    }),
    row: css({
        display: 'flex',
        flexDirection: 'column',
    }),

}

const ShortNav = () => {

    const [state, setState]: any = useState({ active: false })
    const contentState: any = useRecoilValue(contentFlow)
    const navigate = useNavigate()

    useEffect(() => {

        if (contentState.type === 'global') setState({
            active: false,
            title: contentState?.title,
            link: contentState?.link,
            type: 'global',
        })
        else if (contentState.type === 'community') {

            let test = ''
            if (state.type === 'global') test = state.link
            if (state.type === 'community') test = `/c/${state.public_id}`
            if (state.type === 'group') test = `/g/${state.public_id}`


            setState({
                type: 'community',
                public_id: contentState?.public_id,
                active: true,
                title: contentState?.title,
                return: state.title,
                link: test,
            })
        }
        else if (contentState.type === 'group') {

            // let test = ''
            // if (state.type === 'global') test = state.link
            // if (state.type === 'community') test = `/c/${state.public_id}`
            // if (state.type === 'group') test = `/g/${state.public_id}`


            setState({
                type: 'group',
                public_id: contentState?.public_id,
                active: true,
                title: contentState?.title,
                link: null,
            })
        }


    }, [contentState])




    const handleClick = () => {
        navigate(state?.link)
    }



    if (!state.active) return <div></div>

    return <div css={C.container} onClick={handleClick}>


        {state.type === 'group' && <AccountTreeRoundedIcon sx={{
            fontSize: '24px',
            fill: '#b9bbbe',
        }} />}

        {(state.type === 'community' || state.type === 'post') && <ArrowBackRoundedIcon sx={{ fontSize: '28px' }} />}




        <div css={C.row}>
            <div css={textBold('s')}>{state?.title}</div>
            {state?.return && <div css={[textLight('t'), { fontSize: '10px' }]}>To {state?.return}</div>}

        </div>


        {/* <IconButton
            disableRipple={true}
            size="small"
            color="secondary"
            sx={{
                ':hover': { color: '#fff' },
                height: 'z2px',


            }}>
            <ArrowBackRoundedIcon
                sx={{
                    fontSize: '18px',
                }}
            />
            <div css={textLight('t')}>Return to {state?.return}</div>

        </IconButton> */}


        {/* <div css={text}></div> */}
    </div>
}




export default ShortNav