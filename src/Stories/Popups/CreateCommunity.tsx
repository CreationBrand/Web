/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Button, Modal, IconButton, InputAdornment, TextField, styled } from "@mui/material"
import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLabel, textLight, } from "Global/Mixins";

import TextareaAutosize from '@mui/base/TextareaAutosize';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authFlow } from "State/Flow";
import { loginCognito, signUpCognito, verifyEmail } from "Service/Cognito";
import { socketRequest } from "Service/Socket";
import {  communityLTL, communityLTT } from "Helper/Clean";
import { communityListData, communityTreeData } from "State/Data";
import { setRecoil } from "recoil-nexus";

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

        '@media only screen and (max-width: 800px)': {
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '110px 24px 40px',

        }

    }),

    form: css({
        // padding: '40px 40px 32px',

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

    title: css({
        padding: '16px',
        textAlign: 'center',
    }),

    content: css({
        padding: ' 16px',
    }),
}

const StyledTextarea = styled(TextareaAutosize)(() => ``)


const CreateCommunity = ({ open, onClose }: any) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setError } = useForm();
    const [loading, setLoading] = useState(false);


    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)

        data.visability = true
        let res: any = await socketRequest('community-create', data)
        console.log(res)


        if (!res) setLoading(false);

        else if (res.status === 'ok') {
            setRecoil(communityListData, communityLTL(res.communitys))
            setRecoil(communityTreeData, communityLTT(res.communitys))
            onClose()
        }
        setLoading(false)
    })






    return (
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


                <form
                    css={C.form}>


                    <div css={C.title}>
                        <div css={textBold('x')}>Create Community</div>
                        <div css={textLight('t')}>Community titles including capitalization cannot be changed.</div>
                    </div>


                    <div css={C.content}>
                        <h3 css={textLabel('s')}>Title</h3>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, maxLength: 30 }}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    error={errors.username ? true : false}
                                    autoComplete="off"
                                    onChange={onChange}
                                    value={value}
                                    disableUnderline
                                    fullWidth
                                    sx={{
                                        height: "42px",
                                    }}
                                    endAdornment={<div css={{
                                        color: '#b9b6ba',
                                        marginRight: '8px',
                                        fontSize: '12px'
                                    }}>{value.length}/30</div>}
                                />
                            )}
                        />
                    </div>


                    <div css={C.content}>
                        <h3 css={textLabel('s')}>description</h3>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, maxLength: 300 }}
                            render={({ field: { onChange, value } }) => (
                                <StyledTextarea
                                    minRows={3}
                                    placeholder="NOTE: Description will switch to rich text"
                                    onChange={onChange}
                                    value={value}

                                    css={{
                                        color: '#fff',
                                        fontFamily: 'noto sans',
                                        fontSize: "14px",
                                        width: "100%",
                                        borderRadius: "8px",
                                        border: '2px solid transparent',
                                        background: '#181820',
                                        resize: 'none',
                                        outline: 'none !important',
                                        padding: '4px',
                                        '&:hover': {
                                            border: `2px solid #3a3a51`
                                        },
                                        '&:focus': {
                                            border: `2px solid #9147ff`
                                        },
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div css={C.content}>
                        <LoadingButton
                            loadingIndicator="Loading…"
                            loading={loading}
                            onClick={onSubmit}
                            variant='contained'
                            fullWidth
                            disableElevation
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: "42px",
                                borderRadius: "8px",
                                fontSize: "17px",
                                fontWeight: 600,
                                lineHeight: "24px",

                            }}


                        >
                            Create Community
                        </LoadingButton>
                    </div>


                </form>





            </div>
        </Modal >
    )

}


export default CreateCommunity