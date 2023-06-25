/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLabel, textLight, } from "Global/Mixins";
import { Button, Input, MenuItem, Modal, } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import FlatInput from 'Stories/Forum/FlatInput';

const C = {
    container: css({
        backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
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


const Confirm = ({ }: any) => {

    const [open, setOpen] = useState(false);


    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const submit = () => {
        // onDelete()
        setOpen(false)
    }


    return (<div>
        <MenuItem onClick={onOpen}>
            Mute User
            <VolumeOffRoundedIcon />
        </MenuItem>
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
                    <div css={textBold('l')}>Mute User</div>
                    <div css={textLight('m')}>This user will no longer be able to post or comment.</div>
                </div>

                <div css={C.content}>
                    <div css={textLabel('s')}>Reason</div>
                    <Input
                        disableUnderline
                        fullWidth
                    ></Input>
                </div>


                <div css={C.content}>
                    <div css={{ display: 'flex', alignContent: 'center', justifyContent: 'flex-end', gap: 8 }}>

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
                            disableElevation
                            sx={{
                                borderRadius: '8px',
                                background: '#fc4747',
                                ':hover': {
                                    backgroundColor: '#c43b39',
                                }
                            }}

                            variant="contained" onClick={submit}>
                            1D
                        </Button>

                        <Button
                            disableElevation
                            sx={{
                                borderRadius: '8px',
                                background: '#fc4747',
                                ':hover': {
                                    backgroundColor: '#c43b39',
                                }
                            }}

                            variant="contained" onClick={submit}>
                            1M
                        </Button>

                        <Button
                            disableElevation
                            sx={{
                                borderRadius: '8px',
                                background: '#fc4747',
                                ':hover': {
                                    backgroundColor: '#c43b39',
                                }
                            }}

                            variant="contained" onClick={submit}>
                            1Y
                        </Button>
                    </div>
                </div>
            </div>

        </Modal >
    </div >)



}

export default Confirm