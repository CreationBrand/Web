/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, Input, Button, Modal, Switch } from "@mui/material"
import { useEffect, useState } from "react";
import { textBold, textLabel, textLight, } from "Global/Mixins";
import CommunitySelect from "Stories/Bits/CommunitySelect/CommunitySelect";
import { socketRequest } from 'Service/Socket';
import ColorPicker from 'Stories/Forum/ColorPicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { communityListData, communityTreeData, layoutSizeData } from 'State/Data';
import { setRecoil } from 'recoil-nexus';
import { communityLTL, communityLTT } from 'Helper/Clean';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import FlatInput from 'Stories/Forum/FlatInput';
import BitSet from 'bitset';
import { useParams } from 'react-router-dom';

const C = {
    container: css({
        // backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        position: "relative",
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        display: "flex",
        flexDirection: "column",
        height: "auto",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",

        '@media only screen and (max-width: 800px)': {
            // flex: '0 100%',
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '40px 0px 0px',

        }

    }),
    title: css({
        textAlign: 'center',
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
    }),
    switch: css({
        display: 'flex',
        background: '#181820',
        borderRadius: '8px',
        padding: '8px 0px 8px 16px',
        justifyContent: 'space-between',
        marginBottom: '8px',
    }),
    switchTitle: css({
        fontSize: '14px',
        fontWeight: 600,
        color: '#f2f3f5'
    }),
    switchDesc: css({
        fontSize: '12px',
        fontWeight: 400,
        color: '#b9b6ba'
    }),

}


const schema = Joi.object({
    title: Joi.string().required().min(3).max(15),
    color: Joi.number().required(),
    bitSet: Joi.any().required(),
})


const EditRole = ({ role, onClose }: any) => {

    //react hook form
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, formState: { errors }, reset, watch, setError, setValue } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const layout = useRecoilValue(layoutSizeData)
    const params = useParams()

    const onSubmit = async (data: any) => {
        setLoading(true)
        data.permissions = data.bitSet.toString(16)
        delete data.bitset
        data.community_id = params.community_id
        let req: any = await socketRequest('roles-add', data)
        console.log(req)
        setLoading(false)
        if (req.status === 'ok') onClose()
        else setError('title', { message: req.status })
    }

    const onDelete = async () => {
        setLoading(true)
        let req = await socketRequest('roles-remove', { community_id: params.community_id, role_id: role.public_id })
        setLoading(false)
        onClose()
    }

    useEffect(() => {
        setValue('title', role.title)
        setValue('color', role.color)
        setValue('bitSet', role.bitSet)
    }, [role])

    return (
        <Modal open={JSON.stringify(role) !== '{}'} onClose={onClose} css={C.container} >
            <div css={C.popup}>
                <div
                    onClick={onClose}
                    css={{
                        cursor: "pointer",
                        position: layout === 'mobile' ? "absolute" : "fixed",
                        top: layout === 'mobile' ? "8px" : "40px",
                        right: layout === 'mobile' ? "8px" : "56px",
                        zIndex: 4,
                        width: "44px",
                        height: "44px",
                        border: "2px solid #2C2C2C",
                        borderRadius: "50%",
                        fontSize: "0",
                        WebkitTransition: "border-color .2s",
                        transition: "border-color .2s",
                        '&:hover': {
                            borderColor: '#fff'
                        },
                    }}>
                    <CloseRoundedIcon sx={{
                        position: "relative",
                        top: "6px",
                        left: "6px",
                        color: "#adb7be",
                        fontSize: "28px",
                    }} />
                </div>



                <div css={C.title}>
                    <div css={textBold('x')}>Edit Roles</div>
                    <div css={textLight('t')}>Roles are the main way to manage your community!</div>
                </div>

                <div css={C.content}>
                    <div css={textLabel('s')}>Role Name</div>
                    <FlatInput control={control} name="title" defaultValue={role.title} />
                </div>

                <div css={C.content}>
                    <div css={textLabel('s')}>Group Color</div>
                    <ColorPicker control={control} />
                </div>

                <div css={C.content}>
                    <div css={textLabel('s')}>Communitys</div>
                    <Controller
                        name="bitSet"
                        control={control}
                        defaultValue={role.bitSet}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }: any) => <>


                            <div css={C.switch}>
                                <div>
                                    <div css={C.switchTitle}>Muted</div>
                                    <div css={C.switchDesc}>Prevents creating posts or comments</div>
                                </div>
                                <Switch checked={Boolean(value.get(4))} onChange={(e: any, val: any) => {
                                    if (!val) onChange(value.set(4, 0))
                                    else onChange(value = new BitSet('010000'))
                                }} />
                            </div>


                            <div css={C.switch}>
                                <div>
                                    <div css={C.switchTitle}>Public</div>
                                    <div css={C.switchDesc}>Allows users to assign this role themselves</div>
                                </div>
                                <Switch checked={Boolean(value.get(5))} onChange={(e: any, val: any) => {
                                    if (!val) onChange(value.set(5, 0))
                                    else onChange(value = new BitSet('100000'))
                                }
                                } />
                            </div>


                            <div css={C.switch}>
                                <div>
                                    <div css={C.switchTitle}>Manage Tags</div>
                                    <div css={C.switchDesc}>Allows the adding and removing of tags</div>
                                </div>
                                <Switch checked={Boolean(value.get(0))} onChange={(e: any, val: any) => {
                                    value.set(5, 0)
                                    value.set(4, 0)
                                    onChange(value.set(0, val ? 1 : 0))
                                }} />
                            </div>

                            <div css={C.switch}>
                                <div>
                                    <div css={C.switchTitle}>Manage Roles</div>
                                    <div css={C.switchDesc}>Allows the adding and removing of roles</div>
                                </div>
                                <Switch checked={Boolean(value.get(1))} onChange={(e: any, val: any) => {
                                    value.set(5, 0)
                                    value.set(4, 0)
                                    onChange(value.set(1, val ? 1 : 0))
                                }} />
                            </div>

                            <div css={C.switch}>
                                <div>
                                    <div css={C.switchTitle}>Manage Community</div>
                                    <div css={C.switchDesc}>Allows everything but deleting</div>
                                </div>
                                <Switch checked={Boolean(value.get(2))} onChange={(e: any, val: any) => {
                                    value.set(5, 0)
                                    value.set(4, 0)
                                    onChange(value.set(2, val ? 1 : 0))
                                }} />
                            </div>

                        </>} />
                </div>



                <div css={C.footer}>

                    <LoadingButton
                        sx={{
                            borderRadius: '8px',
                            backgroundColor: '#fc4747',
                            marginRight: 'auto',
                            ':hover': {
                                backgroundColor: '#c43b39',
                            }
                        }}
                        onClick={onDelete}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Delete</LoadingButton>


                    <Button onClick={onClose} color='secondary'>Cancel</Button>
                    <LoadingButton
                        sx={{ borderRadius: '8px' }}
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Submit</LoadingButton>
                </div>

            </div>
        </Modal >
    )

}


export default EditRole