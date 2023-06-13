/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLight, } from "Global/Mixins";
import { Button, Modal, } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const C = {
    container: css({
        backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        width: "400px",
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        height: "auto",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",
    }),

    close: css({
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: '#b6bbbf',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff'
        },
    }),
    content: css({
        padding: ' 16px',
    }),
}


const Confirm = ({ onDelete }: any) => {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const submit = () => {
        onDelete()
        setOpen(false)
    }


    return (<div>
        <Button
            sx={{
                borderRadius: '8px',
                background: '#fc4747',
                ':hover': {
                    backgroundColor: '#c43b39',
                }
            }}

            variant="contained" onClick={handleClickOpen}>
            Delete Community
        </Button>
        <Modal open={open} onClose={onClose} css={C.container} >

            <div css={C.popup}>


                <div
                    onClick={onClose}
                    css={{
                        cursor: "pointer",
                        position: "fixed",
                        top: "40px",
                        right: "56px",
                        zIndex: 4,
                        width: "44px",
                        height: "44px",
                        border: "2px solid #2C2C2C",
                        borderRadius: "50%",
                        fontSize: "0",
                        WebkitTransition: "border-color .2s",
                        transition: "border-color .2s",
                        '&:hover': {
                            borderColor: '#fff'
                        },
                    }}>
                    <CloseRoundedIcon sx={{
                        position: "relative",
                        top: "6px",
                        left: "6px",
                        color: "#adb7be",
                        fontSize: "28px",
                    }} />
                </div>


                <div css={C.content}>
                    <div css={textBold('l')}>Delete Community</div>
                    <div css={textLight('m')}>Are you sure you want to delete this community?</div>
                </div>

                <div css={C.content}>
                    <div css={{ display: 'flex', alignContent: 'center', justifyContent: 'flex-end' }}>

                        <div
                            onClick={onClose}
                            css={{
                                cursor: 'pointer',
                                fontSize: '14px',
                                lineHeight: '32px',
                                marginRight: '16px',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                }
                            }}
                        >Cancel</div>



                        <Button

                            sx={{
                                borderRadius: '8px',
                                background: '#fc4747',
                                ':hover': {
                                    backgroundColor: '#c43b39',
                                }
                            }}

                            variant="contained" onClick={submit}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>

        </Modal >
    </div >)



}

export default Confirm