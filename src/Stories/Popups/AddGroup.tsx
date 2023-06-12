/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, Divider, Input, Button, Modal } from "@mui/material"
import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLabel, textLight, textNormal } from "Global/Mixins";

import { HexColorPicker } from "react-colorful";
import { socketRequest } from "Service/Socket";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorPicker from "Stories/Forum/ColorPicker";
import CommunitySelect from "Stories/Bits/CommunitySelect/CommunitySelect";
import { communityTreeData } from "State/Data";
import { useRecoilState } from "recoil";

const C = {
    container: css({
        backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        display: "flex",
        flexDirection: "column",
        height: "auto",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",

        '@media only screen and (max-width: 800px)': {
            // flex: '0 100%',
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '110px 24px 40px',

        }

    }),

    title: css({
        padding: '16px',
        textAlign: 'center',
    }),
    content: css({
        padding: ' 16px',
    }),
    footer: css({
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: '8px',
    }),
    close: css({
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: '#b6bbbf',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff'
        }
    }),
}


const AddGroup = ({ open, handleClose }: Props) => {


    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const [loading, setLoading] = useState(false);
    const [tree, setTree] = useRecoilState(communityTreeData)


    const onSubmit = async (data: any) => {
        setLoading(true)
        console.log(data)
        let req: any = await socketRequest('group-new', data)
        console.log(req)
        if (req.status === 'ok') handleClose()

        setLoading(false)
    }




    return (
        <Modal open={open} onClose={handleClose} css={C.container} >
            <div css={C.popup}>

                <div
                    onClick={handleClose}
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

                <div css={C.title}>
                    <div css={textBold('x')}>Create Group</div>
                    <div css={textLight('t')}>Group communitys to create seperate feeds   </div>
                </div>

                <div css={C.content}>

                    <div css={textLabel('s')}>Group Name</div>

                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                autoComplete="off"
                                onChange={onChange}
                                value={value}
                                disableUnderline
                                fullWidth
                            />}
                    />

                </div>

                <Divider />


                <div css={C.content}>
                    <div css={textLabel('s')}>Group Color</div>
                    <ColorPicker control={control} />
                </div>

                <Divider />
                {/* 
                <div css={C.content}>
                    <div css={textLabel('s')}>Communitys</div>
                    <CommunitySelect control={control} />
                </div> */}

                <Divider />

                <div css={C.footer}>
                    <Button onClick={handleClose} color='secondary'>Cancel</Button>
                    <LoadingButton
                        sx={{ borderRadius: '8px' }}
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Create</LoadingButton>
                </div>


            </div>
        </Modal >
    )


}

interface Props {
    open: boolean,
    handleClose: () => void,
}



export default AddGroup