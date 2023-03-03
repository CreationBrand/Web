/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

import { Dialog, DialogTitle, Divider, DialogContent, Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions, Button, InputAdornment, OutlinedInput, Box, Tab, Tabs } from "@mui/material"
import { smBold, xsMuted } from "Stories/Bits/Text/Text"
import { css } from '@emotion/react';
import { useState } from "react";
import { post } from "Service/Request";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";

import Editor from "Stories/Forum/Editor/Editor";

const CreateCommunity = ({ handleClose }: any) => {

    const contentState: any = useRecoilValue(contentFlow);

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        // setLoading(true);
        // let temp = data;

        // temp.public_id = contentState.public_id;

        // colorLog('[CREATE] Creating Post', 'info')

        // let res: any = await socketRequest('post', temp);

        // if (!res) {

        //     colorLog('[STATE] Creating Post Failed', 'error')
        //     setLoading(false);

        // } else if (res.status === 'ok') {

        //     colorLog('[CREATE] Created Post.', 'sucess')
        //     handleClose();

        // } else {
        //     setLoading(false);
        // }

    };

    return (

        <div css={{ width: '100%', padding: '0 22px 22px 22px' }
        }>
            <form>
                {/* <div css={smBold}>Create a Post</div> */}
                {/* 
                <Divider css={{margin:'12px 0'}} /> */}




                <Controller
                    name="type"
                    control={control}
                    defaultValue="TEXT"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) =>
                        <TabContext value={value}>
                            <Box sx={{ marginBottom:'12px' }}>
                                <TabList onChange={(e, v) => { onChange(v) }} aria-label="lab API tabs example">
                                    <Tab label="Texasfasdft" value="TEXT" />
                                    <Tab label="Image" value="IMAGE" />
                                    <Tab label="Video" value="VIDEO" />
                                </TabList>
                            </Box>





                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) =>
                                    <Input
                                        sx={{ background: '#272732' }}
                                        inputProps={{ maxLength: 300 }}
                                        autoComplete="off"
                                        placeholder="Title"
                                        onChange={onChange}
                                        value={value}
                                        disableUnderline
                                        fullWidth
                                        multiline
                                    />}
                            />



                            <Divider css={{ margin: '16px 0 16px' }} />


                            <TabPanel value="TEXT" >
                                <Controller
                                    name="content"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) =>



                                        <Editor />


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
                            <TabPanel value="IMAGE">

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
                            <TabPanel value="VIDEO">


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
                        </TabContext>
                    }

                />




            </form >
        </div >
    )

}


export default CreateCommunity