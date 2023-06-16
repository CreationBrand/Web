
/** @jsxImportSource @emotion/react */

import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal } from "@mui/material"
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { textBold, textLabel, textLight, } from "Global/Mixins";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from "react-router-dom";
import { socketRequest } from "Service/Socket";
import { communityLTT } from "Helper/Clean";
import { communityTreeData } from "State/Data";
import FlatInput from "Stories/Forum/FlatInput";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import ColorPicker from "Stories/Forum/ColorPicker";
import { useRecoilState } from "recoil";

const C = {
    container: css({
        backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }),
    popup: css({
        width: "424px",
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        height: "auto",
        maxHeight: "100vh",
        overflowY: "scroll",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",

        '@media only screen and (max-width: 800px)': {
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '80px 0px 0px',
            overflowY: 'scroll',

        }

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
        padding: ' 16px 16px 16px 16px',
    }),
}



const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    color: Joi.number().required(),
})


const AddGroup = ({ open, onClose }: any) => {

    const [loading, setLoading] = useState(false);
    const [tree, setTree]: any = useRecoilState(communityTreeData)

    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        mode: 'onChange',
        resolver: joiResolver(schema)
    });

    const data = watch()
    usePreventBackNavigation(onClose)

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)
        let req: any = await socketRequest('group-new', data)

        let newTree = communityLTT([req.group], tree.length + 1)
        if (req.status === 'ok') {
            setTree((currentState: any) => [
                ...currentState,
                ...newTree
            ]);
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

                <div css={C.title}>
                    <div css={textBold('x')}>Create Group</div>
                    <div css={textLight('t')}>Group communitys to create seperate feeds.</div>
                </div>

                <div css={C.content}>
                    <h3 css={textLabel('s')}>Title</h3>
                    <FlatInput name='title' control={control} maxLength={30} />
                </div>

                <div css={C.content}>
                    <h3 css={textLabel('s')}>Color</h3>
                    <ColorPicker control={control} />
                </div>

                <div css={C.content}>
                    <LoadingButton
                        disabled={Boolean(Object.keys(errors).length) || data.title === '' || !data.color}
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
                        Create Group
                    </LoadingButton>
                </div>

            </div>
        </Modal >
    )

}


export default AddGroup

const usePreventBackNavigation = (onClose: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            onClose()
            event.preventDefault();
            navigate('/trending');
        };
        window.onpopstate = handleBeforeUnload;
        return () => {
            window.onpopstate = handleBeforeUnload;
        };
    }, [navigate]);

};