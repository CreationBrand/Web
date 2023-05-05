/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, Divider, Input, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { textLabel, textLight, textNormal } from "Global/Mixins";
import { HexColorPicker } from "react-colorful";
import CommunitySelect from "Stories/Bits/CommunitySelect/CommunitySelect";
import { socketRequest } from 'Service/Socket';

const C = {
    container: css({
    }),
    popup: css({
        background: '#272732',
        borderRadius: '12px',
        width: '460px',
    }),
    title: css({
        padding: '16px',
    }),
    content: css({
        padding: ' 16px',
    }),
    footer: css({
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: '8px',
        background: '#181820',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',

    })

}


const EditGroup = ({ group, handleClose }: any) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm();
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: any) => {

        // setLoading(true)

        data.public_id = group.public_id
        data.color = parseInt(data.color.slice(1), 16)
        let req: any = await socketRequest('group-update', data)

        // if(req.status === 'ok') handleClose()
        setLoading(false)

    }



    // setDefaultValues
    useEffect(() => {
        let currentChildren = group?.children?.map((child: any) => child.public_id)

        setValue('children', currentChildren)
        setValue('color', "#" + group?.color?.toString(16))

    }, [])

    if (!group) return (<></>)




    return (
        <Dialog open={JSON.stringify(group) !== '{}'} onClose={handleClose} css={C.container} sx={{
            paper: { borderRadius: '12px' },
            borderRadius: '12px'
        }}>

            <form css={C.popup}>

                <div css={C.title}>
                    <div css={textNormal('x')}>Edit {group.title}</div>
                    <div css={textLight('t')}>Group communitys to create seperate feeds   </div>
                </div>


                <Divider />

                <div css={C.content}>

                    <div css={textLabel('t')}>Group Name</div>

                    <Controller
                        name="title"
                        control={control}
                        defaultValue={group.title}
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

                </div>

                <Divider />


                <div css={C.content}>
                    <div css={textLabel('t')}>Group Color</div>

                    <Controller
                        name="color"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }: any) =>

                            <HexColorPicker
                                style={{ width: '140px', height: '140px' }}
                                onChange={onChange}
                                color={value}
                            />



                        }
                    />

                </div>

                <Divider />

                <div css={C.content}>

                    <div css={textLabel('t')}>Communitys</div>

                    <Controller
                        name="children"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <CommunitySelect onChange={onChange}
                                value={value} group={group} />
                        }
                    />
                </div>

                <div css={C.footer}>
                    <Button onClick={handleClose} color='secondary'>Cancel</Button>
                    <LoadingButton
                        onMouseDown={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Update</LoadingButton>
                </div>
            </form>
        </Dialog >
    )

}


export default EditGroup