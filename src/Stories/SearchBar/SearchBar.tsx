/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Button, Dialog, DialogActions, Modal, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";

import { useLocation } from 'react-router-dom';

const C = {
    container: css({
        height: '32px',
        width: '100%',
        marginLeft: '12px',
        marginRight: '12px',
        borderRadius: '4px',
        display: 'flex',
        background: '#0e0e10',
        border: `2px solid #0e0e10`,
        '&:hover': {
            border: `2px solid hsla(0,0%,100%,.2)`
        },

    }),
    block: css({
        height: '28px',
        width: '100%',
        marginLeft: '12px',
        marginRight: '12px',
        borderRadius: '4px',
        color: '#fff'

        // background: '#0e0e10',
    }),
    dialog: css({
        minHeight: '40%',
        width: '40%',
        padding: '12px',
        borderRadius: '4px',
        background: '#464649',
        margin: 'auto',

    }),
    input: css({
        background: '#0e0e10',
        'MuiOutlinedInput-notchedOutline': {
            border: `2px solid red`,

            // outline: `2px solid hsla(0,0%,100%,.2)`,
            '&:hover': {
                border: `2px solid red`,
            },
            '&:focus': {
                border: 'none',
                outline: `2px solid #9147ff`
            },


        },

    }),
}

const SearchBar = () => {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    let path = []
    let location = useLocation();

    if (location.pathname === '/home') { path.push(<div css={C.block} key={1}># Home</div>) }


    return (
        <>
            <div css={C.container} id="SearchBar" onClick={handleOpen}>
                {path}
            </div>
            <Modal open={open} onClose={handleClose} sx={{
                display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }} >
                <div css={C.dialog}>
                    <OutlinedInput
                        css={C.input}

                        autoFocus
                        fullWidth
                        placeholder="Search..." />

                </div>
            </Modal>

        </>
    )



}



export default SearchBar