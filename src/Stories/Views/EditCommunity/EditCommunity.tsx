/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, Box, Tab, TextField, } from "@mui/material"
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";

import Editor from 'Stories/Bits/Editor/Editor';
// import Editor from "Stories/Forum/Editor/Editor";

import { personData } from 'State/Data';


import CommunitySelect from 'Stories/Bits/Select/CommunitySelect';
import { textBold, textLabel } from 'Global/Mixins';

// ICONS
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';



import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import DropZone from 'Stories/Bits/DropZone/DropZone';
import MainPost from 'Stories/Chunk/Post/MainPost';

// VALIDATION

const schema = Joi.object({
    title: Joi.string().min(5).max(300).required(),
    community_id: Joi.string().min(10).required(),
    type: Joi.string().required().valid('text', 'link', 'upload'),
    content: Joi.alternatives()
        .conditional('type', [
            { is: 'text', then: Joi.string() },
            { is: 'link', then: Joi.string().uri().required() },
            { is: 'upload', then: Joi.any() }])
})


const C = {
    container: css({
        width: '100%',
        height: 'calc(100% - 56px)',
        padding: '22px',
        scrollbarGutter: 'stable both-edges',
        overflow: 'auto',
        background: '#272732',
        marginTop: '8px',
        borderRadius: '8px',

    }),
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',

    }),
    section: css({
        width: '100%',
        background: '#343442',
        borderRadius: '8px',
    }),
    wrapper: css({
        padding: '8px',
    }),
    row: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    }),
    upload: css({
        width: '100%',
        height: '120px',
        background: '#343442',
        borderRadius: '8px',
    }),

    link: css({
        width: '100%',
        background: '#343442',
        borderRadius: '8px',
        padding: '8px',
    }),
}

const EditCommunity = () => {

    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const data = watch()

    const onSubmit = async () => {

        console.log(data)
        // let req = await socketRequest('post-new', data)

    };



    return <div css={C.container}>
        <div css={C.inner}>

            <div css={C.row}>
                <div css={textBold('x')}>Edit Community</div>
                <div>
                    <Button color='secondary'>Cancel</Button>
                    <Button
                        disabled={!(Object.keys(errors).length === 0 && errors.constructor === Object)}
                        disableElevation
                        sx={{
                            marginLeft: '8px',
                            borderRadius: '8px',
                        }}
                        onMouseDown={onSubmit} variant='contained'>Submit</Button>
                </div>
            </div>

            <Divider sx={{ margin: '12px' }} />

            <div css={textLabel('t')}>Change Title</div>

            <Controller
                name="title"
                control={control}
                defaultValue={'title'}
                render={({ field: { onChange, value } }) => (
                    <Input
                        disableUnderline
                        onChange={onChange} value={value} />
                )} />

            <Divider sx={{ margin: '12px' }} />

            <div css={textLabel('t')}>Change Description</div>

            <Controller
                name="description"
                control={control}
                defaultValue={'title'}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        multiline
                        minRows={4}
                        onChange={onChange} value={value} />
                )} />





            <Divider sx={{ margin: '12px' }} />

            <div css={textLabel('s')}>Edit Roles</div>





        </div>
    </div>

}


export default EditCommunity


/*
{
    type: 'image' | 'carosoul' 
    source :
}*/