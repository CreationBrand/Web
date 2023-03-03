/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, Box, Tab, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";

import Editor from 'Stories/Bits/Editor/Editor';
// import Editor from "Stories/Forum/Editor/Editor";
import { mMuted, mNormal, sMuted, xBold } from 'Stories/Bits/Text/Text';

import { communityData, personData } from 'State/Data';
import Post from 'Stories/Chunk/Post/Post';
import useCommunityArray from 'Hooks/useCommunityArray';
import { socketRequest } from 'Service/Socket';
import Avatar from 'Stories/Bits/Avatar/Avatar';

import CommunityElem from 'Stories/Bits/ListElem/CommunityElem';
import { SelectUnstyled } from '@mui/base';
import CommunitySelect from 'Stories/Bits/Select/CommunitySelect';

const C = {
    container: css({
        width: '100%',
        height: 'calc(100% - 100px)',
        padding: '22px',
        overflowY: 'auto',
        scrollbarGutter: 'stable both-edges',
    }),
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
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
    }),
}

const Submit = () => {

    // state
    const communityArr = useCommunityArray();
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const [loading, setLoading] = useState(false);
    const data = watch(); // you can supply default value as second argument

    // handlers
    const onSubmit = async () => {


        console.log(data)

        let req = await socketRequest('post-new', data)
        console.log(req);

    };


    // let selectOptions = communityArr.map((c: any, i: any) => {
    //     console.log(c)
    //     return (

    //         <CommunityElem {...c} />

    //     )
    // })


    return <div css={C.container}>
        <div css={C.inner}>

            <div css={C.row}>
                <div css={xBold}>Create a Post</div>
                <div>
                    <Button color='secondary'>Cancel</Button>
                    <Button onMouseDown={onSubmit} variant='outlined'>Submit</Button>
                </div>
            </div>

            <Divider />




            <div css={mMuted}>Your Communitys</div>

            <Controller
                name="community_id"
                control={control}
                defaultValue={contentState.public_id}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <CommunitySelect onChange={onChange} value={value} />
                )} />



            <form>



                <Controller
                    name="type"
                    control={control}
                    defaultValue="text"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) =>
                        <TabContext value={value}>

                            <div css={C.section}>

                                <Box sx={{ marginBottom: '12px' }}>
                                    <TabList

                                        sx={{
                                            color: 'white',
                                        }}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        onChange={(e, v) => { onChange(v) }}>
                                        <Tab
                                            sx={{ fontFamily: 'ubuntu !important' }}
                                            label="Text" value="text" />
                                        <Tab label="link" value="link" />
                                        <Tab label="upload" value="upload" />
                                    </TabList>
                                </Box>



                                <div css={C.wrapper}>

                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) =>
                                            <Input
                                                sx={{
                                                    height: '40px',
                                                    fontFamily: 'ubuntu',
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


                                            // <Input
                                            //     autoComplete="off"
                                            //     onChange={onChange}
                                            //     value={value}
                                            //     disableUnderline
                                            //     fullWidth
                                            //     multiline
                                            //     minRows={4}
                                            //     maxRows={12}
                                            // />




                                        }
                                    />
                                </TabPanel>
                                <TabPanel
                                    sx={{ padding: '0' }}
                                    value="IMAGE">

                                    <Controller
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
                                    />

                                </TabPanel>
                                <TabPanel
                                    sx={{ padding: '0' }}
                                    value="VIDEO">


                                    <Controller
                                        name="content"
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

                                </TabPanel>
                            </div>

                        </TabContext>
                    } />
            </form >
        </div>





        <div css={[xBold, { marginTop: '24px' }]}>Post Preview</div>

        <Divider css={{ margin: '16px 0 16px' }} />

        <Post
            public_id={''}
            title={data.title}
            type={data.type}
            content={data.content}
            karma={0}
            comments={0}
            created_at={''}
            updated_at={''}
            hot={0}
            author={person}
            community={communityArr[data.community]}
        />

    </div>

}



export default Submit   