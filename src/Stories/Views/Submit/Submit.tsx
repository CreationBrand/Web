/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, Box, Tab, } from "@mui/material"
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";

import Editor from 'Stories/Bits/Editor/Editor';
// import Editor from "Stories/Forum/Editor/Editor";

import { personData } from 'State/Data';
import Post from 'Stories/Chunk/Post/Post';
import { socketRequest } from 'Service/Socket';
import Avatar from 'Stories/Bits/Avatar/Avatar';


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

const Submit = () => {

    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const data = watch()


    // console.log(data, errors)
    // handlers
    const onSubmit = async () => {

        console.log(data)
        // console.log(data)
        let req = await socketRequest('post-new', data)
        // console.log(req);

    };



    return <div css={C.container}>
        <div css={C.inner}>

            <div css={C.row}>
                <div css={textBold('x')}>Create a Post</div>
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

            <div css={textLabel('t')}>Select a Community </div>

            <Controller
                name="community_id"
                control={control}
                defaultValue={'0'}
                render={({ field: { onChange, value } }) => (
                    <CommunitySelect onChange={onChange} value={value} />
                )} />

            <Divider sx={{ margin: '12px' }} />


            <form>



                <Controller
                    name="type"
                    control={control}
                    defaultValue="text"
                    render={({ field: { onChange, value } }) =>
                        <TabContext value={value}>
                            <div css={C.section}>
                                <TabList
                                    sx={{
                                        fontFamily: 'noto sans',
                                        color: 'white',
                                        height: '40px !important',
                                    }}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    onChange={(e, v) => { onChange(v) }}>
                                    <Tab label="Post" value="text"
                                        icon={<FeedRoundedIcon />}
                                        iconPosition="start"
                                    />
                                    <Tab label="Link" value="link"
                                        icon={<OpenInNewRoundedIcon />}
                                        iconPosition="start"
                                    />
                                    <Tab label="Image/Video" value="upload"
                                        icon={<BackupRoundedIcon />}
                                        iconPosition="start"

                                    />
                                </TabList>


                                <div css={C.wrapper}>

                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={''}


                                        render={({ field: { onChange, value } }) =>
                                            <Input
                                                error={errors?.title ? true : false}
                                                sx={{
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    background: '#272732'
                                                }}
                                                inputProps={{ maxLength: 300 }}
                                                autoComplete="off"
                                                placeholder="Enter a Title"
                                                onChange={onChange}
                                                value={value}
                                                disableUnderline
                                                fullWidth
                                                multiline
                                            />}
                                    />
                                </div>
                            </div>


                            <Divider css={{ margin: '16px 0 16px' }} />


                            <div css={C.section}>
                                <TabPanel
                                    sx={{ padding: '0' }}
                                    value="text" >
                                    <Controller
                                        name="content"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) =>
                                            <Editor placeholder={'Type your Post here!'} value={value} onChange={onChange} />
                                        }
                                    />
                                </TabPanel>


                                <TabPanel
                                    sx={{ padding: '0' }}
                                    value="upload">

                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field: { onChange, value } }) =>
                                            <DropZone
                                                value={value}
                                                onChange={onChange}
                                            />

                                        }
                                    />






                                    {/* <Controller
                                        name="content"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) =>
                                            <Input
                                                sx={{ background: '#151618' }}
                                                autoComplete="off"
                                                onChange={onChange}
                                                value={value}
                                                disableUnderline
                                                fullWidth

                                            />}
                                    /> */}

                                </TabPanel>

                                {/* LINK */}
                                <TabPanel
                                    sx={{ padding: '0' }}
                                    value="link">

                                    <div css={C.link}>
                                        <Controller
                                            name="content"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: true, minLength: 5 }}
                                            render={({ field: { onChange, value } }) =>
                                                <Input
                                                    error={!!errors.content}

                                                    placeholder="Enter a Link"
                                                    sx={{
                                                        height: '40px',
                                                        fontSize: '14px',
                                                        background: '#272732'
                                                    }}
                                                    autoComplete="off"
                                                    onChange={onChange}
                                                    value={value}
                                                    disableUnderline
                                                    fullWidth

                                                />}
                                        />
                                    </div>
                                </TabPanel>
                            </div>

                        </TabContext>
                    } />
            </form >

            <Divider sx={{ margin: '12px' }} />

            <div css={textLabel('s')}>POST PREVIEW</div>

            <MainPost
                public_id={false}
                title={data.title}
                type={data.type}
                content={data.content}
                karma={0}
                views={0}
                comments={0}
                created_at={'2023-05-12T08:12:02.829Z'}
                updated_at={false}
                hot={false}
                author={person}
            />
        </div>
    </div>

}


export default Submit


/*
{
    type: 'image' | 'carosoul' 
    source :
}*/