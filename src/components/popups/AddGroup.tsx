
/** @jsxImportSource @emotion/react */

import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal } from "@mui/material"
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from "react-router-dom";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "@/hooks/util/useSocket";
import { communityLTT } from "@/service/Clean";
import { communityTree } from "@/state/person";
import ColorPicker from "../forum/ColorPicker";
import FlatInput from "../forum/FlatInput";
import { layoutSize } from "@/state/layout";
import RouteModal from "@/layouts/RouteModal";
import { forumLabel, header, subheader } from "@/global/mixins";

const C = {
    title: css({
        padding: '16px 16px 0px 16px',
        textAlign: 'center',
    }),
    content: css({
        padding: '0px 16px 16px 16px',
    }),
}



const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    color: Joi.number().required(),
})


const AddGroup = () => {

    const [loading, setLoading] = useState(false);
    const [tree, setTree]: any = useRecoilState(communityTree)
    const navigate = useNavigate()
    const layout = useRecoilValue(layoutSize)




    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        mode: 'onChange',
        resolver: joiResolver(schema)
    });


    const onClose = () => {
        reset()
        navigate(-1)
    }


    const data = watch()
    // usePreventBackNavigation(onClose)

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
        <RouteModal>
            <div css={{ width: layout === 'desktop' ? '416px' : '100%' }}>
                <div css={C.title}>
                    <div css={header}>Create Group</div>
                    <div css={subheader}>Group communitys to create seperate feeds</div>
                </div>

                <div css={C.content}>
                    <h3 css={forumLabel}>Title</h3>
                    <FlatInput name='title' control={control} maxLength={30} />

                    <h3 css={forumLabel}>Color</h3>
                    <ColorPicker control={control} />

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
                            marginTop: "24px",
                            borderRadius: "8px",
                            fontSize: "18px",
                            fontWeight: 600,
                            lineHeight: "17px",
                        }}>
                        Create Group
                    </LoadingButton>
                </div>
            </div>
        </RouteModal>
    )

}


export default AddGroup

