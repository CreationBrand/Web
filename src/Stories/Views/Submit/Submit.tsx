/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, DialogContent, Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions, Button, InputAdornment, OutlinedInput, Box, Tab, Tabs, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";

import Editor from "Stories/Forum/Editor/Editor";
import { sMuted, xBold } from 'Stories/Text/Text';
import NavButton from 'Stories/Objects/NavButton/NavButton';
import CommunityElem from 'Stories/Bits/ListElem/CommunityElem';
import { communityData, personData } from 'State/Data';
import Post from 'Stories/Chunk/Post/Post';
import useCommunityArray from 'Hooks/useCommunityArray';

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
    const onSubmit = async (data: any) => { };

    const menuProps = {
        PaperProps: {
            style: {
                background: '#151618',
                marginTop: '4px',
                gap: '8px',
                padding: '8px',
                width: 300,
            },
        }
    }

    let selectOptions = communityArr.map((c: any, i: any) => {
        return (
            <MenuItem value={i}
                sx={{
                    borderRadius: '8px',
                    height: '40px',
                    padding: '0px',
                    marginTop: '4px'
                }}>
                <CommunityElem {...c} />
            </MenuItem>
        )
    })


    return <div css={C.container}>
        <div css={C.inner}>

            <div css={xBold}>Create a Post</div>

            <Divider />

            <Controller
                name="community"
                control={control}
                defaultValue={0}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        value={value}
                        onChange={onChange}
                        variant="standard"
                        sx={{
                            outline: 'none !important',
                            border: '2px solid #151618',
                            background: '#151618',
                            borderRadius: '8px',
                            maxWidth: '300px',
                            height: '40px',
                            '&:hover': {
                                border: `2px solid hsla(0,0%,100%,.1)`
                            },
                            "&.Mui-focused": {
                                border: '2px solid #9147ff',
                            },
                            '&.Mui-error': {
                                border: '2px solid red',
                            }
                            ,
                            '.MuiMenu-list': {
                                background: '#151618',
                                borderRadius: '8px',
                                maxWidth: '300px',
                            }
                        }}
                        MenuProps={menuProps}
                        placeholder="Select a Community"
                        disableUnderline
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <div css={sMuted}>Your Communitys</div>
                        {selectOptions}
                    </Select>
                )} />


            <div css={C.section}>
                <form>
                    <Controller
                        name="type"
                        control={control}
                        defaultValue="TEXT"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <TabContext

                                value={value}>
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
                                            label="Text" value="TEXT" />
                                        <Tab label="Image" value="IMAGE" />
                                        <Tab label="Video" value="VIDEO" />
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

                                    <Divider css={{ margin: '16px 0 16px' }} />

                                    <TabPanel
                                        sx={{ padding: '0' }}
                                        value="TEXT" >
                                        <Controller
                                            name="content"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) =>



                                                <Editor value={value} onChange={onChange} />


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
                        }

                    />




                </form >
            </div>

            <div css={xBold}>Post Preview</div>

            <Divider />

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
    </div>
}



export default Submit   