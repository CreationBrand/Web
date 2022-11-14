/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

import { Dialog, DialogTitle, Divider, DialogContent, Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions, Button, InputAdornment, OutlinedInput, Box, Tab, Tabs } from "@mui/material"
import { smBold, xsMuted } from "Stories/Text/Text"
import { css } from '@emotion/react';
import { useState } from "react";
import { post } from "Service/Request";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";
import { socketRequest } from "Service/Socket";
import colorLog from "Util/colorLog";

const CreateCommunity = ({ open, handleClose }: Props) => {

    const contentState: any = useRecoilValue(contentFlow);

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        let temp = data;

        temp.public_id = contentState.public_id;

        colorLog('[CREATE] Creating Post', 'info')

        let res: any = await socketRequest('post', temp);

        if (!res) {

            colorLog('[STATE] Creating Post Failed', 'error')
            setLoading(false);

        } else if (res.status === 'ok') {

            colorLog('[CREATE] Created Post.', 'sucess')
            handleClose();

        } else {
            setLoading(false);
        }

    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
            <form>

                <DialogTitle>Create a Post in: {contentState.title}</DialogTitle>
                <Divider />

                <DialogContent>
                    <div css={smBold}>Title</div>
                    <div css={[xsMuted, { marginBottom: '12px' }]}>Community names including capitalization cannot be changed.</div>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                inputProps={{ maxLength: 300 }}
                                autoComplete="off"
                                onChange={onChange}
                                value={value}
                                disableUnderline
                                fullWidth
                                multiline
                            />}
                    />
                </DialogContent>
                <Divider />

                <DialogContent>


                    {/* text */}
                    <div css={smBold}>Content</div>
                    <div css={xsMuted}>Body can not be empty.</div>

                    {/* tabs */}


                    <Controller
                        name="type"
                        control={control}
                        defaultValue="TEXT"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={(e, v) => { onChange(v) }} aria-label="lab API tabs example">
                                        <Tab label="Text" value="TEXT" />
                                        <Tab label="Image" value="IMAGE" />
                                        <Tab label="Video" value="VIDEO" />
                                    </TabList>
                                </Box>
                                <TabPanel value="TEXT">
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
                                                multiline
                                                minRows={4}
                                                maxRows={12}
                                            />}
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


                </DialogContent>



                <Divider />

                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>Cancel</Button>

                    <LoadingButton
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >
                        Create
                    </LoadingButton>


                    {/* <Button type="submit" onClick={handleSubmit(onSubmit)}>Create</Button> */}
                </DialogActions>
            </form>
        </Dialog >
    )

}

interface Props {
    open: boolean,
    handleClose: () => void,
}



export default CreateCommunity