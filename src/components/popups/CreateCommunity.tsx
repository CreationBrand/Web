/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material"
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { setRecoil } from "recoil-nexus";

import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { socketRequest } from "@/hooks/util/useSocket";
import { communityLTL, communityLTT } from "@/service/Clean";
import { communityList, communityTree } from "@/state/person";
import { layoutSize } from "@/state/layout";
import RouteModal from "@/layouts/RouteModal";
import { forumLabel, header, subheader } from "@/global/mixins";
import ColorPicker from "../forum/ColorPicker";
import FlatInput from "../forum/FlatInput";
import RichInput from "../forum/RichInput";
import { bg_2 } from "@/global/var";

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
    title: Joi.string().min(5).max(22).required(),
    description: Joi.string().min(30).max(800).required(),
    visability: Joi.boolean().required()
})



const CreateCommunity = () => {

    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        mode: 'onChange',
        resolver: joiResolver(schema)
    });

    const layout = useRecoilValue(layoutSize)
    const data = watch()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onClose = () => {
        reset()
        navigate(-1)
    }

    const onSubmit = handleSubmit(async (data) => {

        setLoading(true)

        let res: any = await socketRequest('community-create', data)

        if (!res) setLoading(false);

        else if (res.status === 'ok') {
            reset()
            setRecoil(communityList, communityLTL(res.communitys))
            setRecoil(communityTree, communityLTT(res.communitys))
            onClose()
        }
        setLoading(false)
    })

    return (
        <RouteModal>
            <div css={{ width: layout === 'desktop' ? '416px' : '100%' }}>
                <div css={C.title}>
                    <div css={header}>Create Community</div>
                    <div css={subheader}>Community titles including capitalization cannot be changed.</div>
                </div>

                <div css={C.content}>
                    <h3 css={forumLabel}>Title</h3>
                    <FlatInput name='title' control={control} maxLength={22} />

                    <h3 css={forumLabel}>Description</h3>
                    <RichInput name='description' control={control} />

                    <h3 css={forumLabel}>Visibility</h3>
                    <Controller name='visability' control={control} defaultValue={false}
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <RadioGroup
                                value={value}
                                onChange={onChange}
                            >
                                <FormControlLabel
                                    sx={{
                                        height: '40px',
                                        margin: '0px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        background: bg_2,
                                        alignItems: 'center',

                                    }}
                                    value={false} control={<Radio />} label="Not Safe For Work" />
                                <FormControlLabel
                                    sx={{
                                        height: '40px',
                                        alignItems: 'center',
                                        margin: '0px',
                                        marginTop: '4px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        background: bg_2,

                                    }}
                                    value={true} control={<Radio />} label="Safe For Work" />
                            </RadioGroup>
                        )} />


                    <LoadingButton
                        disabled={ Boolean(Object.keys(errors).length) || Boolean(Object.keys(data).length === 0)}
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
                        Create Community
                    </LoadingButton>
                </div>
            </div>
        </RouteModal>
    )

}


export default CreateCommunity

