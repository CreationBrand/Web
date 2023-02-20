/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

import { Dialog, DialogTitle, Divider, DialogContent, Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions, Button, InputAdornment, OutlinedInput } from "@mui/material"
import { smBold, xsMuted } from "Stories/Bits/Text/Text"
import { css } from '@emotion/react';
import { useState } from "react";
import { post } from "Service/Request";
import { socketRequest } from "Service/Socket";

const CreateCommunity = ({ open, handleClose }: Props) => {

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setLoading(true);
        console.log(data)

        let res = await socketRequest('community-create', data)
        console.log(res)
        if (!res) setLoading(false);

        // if (res.status === 200) {
        //     handleClose();
        // }errors{
        //     setLoading(false);

        // }

    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form>

                <DialogTitle>Create a Community</DialogTitle>
                <Divider />

                <DialogContent>
                    <div css={smBold}>Name</div>
                    <div css={[xsMuted, { marginBottom: '12px' }]}>Community names including capitalization cannot be changed.</div>
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
                </DialogContent>
                <Divider />

                <DialogContent>
                    <div css={smBold}>Visability</div>
                    <div css={xsMuted}>Whether or not Users will be able to join.</div>
                    <Controller
                        name="visability"
                        control={control}
                        defaultValue="public"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <RadioGroup value={value} onChange={onChange}>
                                <FormControlLabel value={true} control={<Radio />} label="Public" />
                                <FormControlLabel value={false} control={<Radio />} label="Private" />
                            </RadioGroup>
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