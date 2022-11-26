/** @jsxImportSource @emotion/react */


import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { css } from "@emotion/react"
import { Button, Dialog, DialogActions, Input, Modal, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { useLocation } from 'react-router-dom';
import { contentFlow } from "State/Flow";
import { useRecoilValue } from "recoil";
import { mNormal } from "Stories/Text/Text";

const C = {
    container: css({
        height: '32px',
        width: '100%',
        marginLeft: '12px',
        marginRight: '12px',
        borderRadius: '8px',
        display: 'flex',
        background: '#0e0e10',
        alignItems: 'center',
        paddingLeft: '4px',
        border: `2px solid #0e0e10`,
        '&:hover': {
            border: `2px solid hsla(0,0%,100%,.2)`
        },

    }),
    block: css({
        height: '28px',
        width: 'auto',
        marginLeft: '12px',
        marginRight: '12px',
        padding: '0px 4px 0px 4px',
        borderRadius: '4px',
        color: '#fff',

    }),
    dialog: css({
        minHeight: '40%',
        width: '40%',
        padding: '12px',
        borderRadius: '4px',
        background: '#464649',
        margin: 'auto',
    }),

community: css({
    borderRadius: '8px',
    height: '22px',
    display: 'flex',
    marginLeft: '8px',
    padding: '0px 8px 0px 8px',
    background: '#29232c',
    alignItems: 'center',
    // border: `2px solid #66bb6a`,
}),
    icon: css({
        height: '16px',
        width: '16px',
        borderRadius: '4px',
        marginRight: '4px',
    }),
}

const SearchBar = () => {


    let contentState = useRecoilValue(contentFlow);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    let path = []
    let location = useLocation();



    // console.log(contentState)


    if (contentState.type === 'community') {
        path.push(
            <div css={C.community} key='1'>
                <img css={C.icon} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${contentState.public_id}.png`}></img>
                <div css={mNormal}>{contentState.title}</div>
            </div>
        )
    }

    // if (location.pathname === '/home') { path.push(<div css={C.block} key={1}># Home</div>) }




    return (
        <>
            <div css={C.container} id="SearchBar" onClick={handleOpen}>

                <SearchRoundedIcon color='secondary' />

                {path}
            </div>
            <Modal open={open} onClose={handleClose} sx={{
                display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }} >
                <div css={C.dialog}>
                    <Input
                        sx={{ borderRadius: '8px' }}
                        autoFocus
                        fullWidth
                        placeholder="Search..." 
                        />

                </div>
            </Modal>

        </>
    )



}



export default SearchBar