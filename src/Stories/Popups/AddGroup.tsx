/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, Divider, Input, Button } from "@mui/material"
import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLabel, textLight, textNormal } from "Global/Mixins";

import { HexColorPicker } from "react-colorful";
import { socketRequest } from "Service/Socket";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const C = {
    container: css({
        background: '#15161894',
    }),
    popup: css({
        background: '#272732',
        borderRadius: '8px',
        width: '460px',
        position: 'relative',
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


    const onSubmit = async (data: any) => {
        setLoading(true)
        data.color = parseInt(data.color.slice(1), 16)
        let req: any = await socketRequest('group-new', data)
        if (req.status === 'ok') handleClose()
        setLoading(false)
    }


    return (
        <Dialog open={open} onClose={handleClose} css={C.container} sx={{
            paper: { borderRadius: '12px' },
            borderRadius: '12px'
        }}>

            <form css={C.popup}>

                <div css={C.close} onClick={handleClose}><CloseRoundedIcon sx={{ fontSize: '29px' }} /></div>

                <div css={C.title}>
                    <div css={textBold('x')}>Create Group</div>
                    <div css={textLight('t')}>Group communitys to create seperate feeds   </div>
                </div>


                <Divider />

                <div css={C.content}>

                    <div css={textLabel('t')}>Group Name</div>

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
                    <div css={textLabel('t')}>Group Color</div>

                    <Controller
                        name="color"
                        control={control}
                        defaultValue="#aabbcc"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }: any) =>

                            <HexColorPicker

                                onChange={onChange}
                                //@ts-ignore
                                value={value}
                            />



                        }
                    />

                </div>


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
            </form>
        </Dialog >
    )

}

interface Props {
    open: boolean,
    handleClose: () => void,
}



export default AddGroup