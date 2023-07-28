/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, Input, Button, Modal } from "@mui/material"
import { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from 'recoil';
import { setRecoil } from 'recoil-nexus';
import { socketRequest } from '@/hooks/util/useSocket';
import { communityLTL, communityLTT } from '@/service/Clean';
import { communityList, communityTree } from '@/state/person';
import ColorPicker from '../forum/ColorPicker';
import { forumLabel, header, subheader } from '@/global/mixins';
import { layoutSize } from '@/state/layout';
import CommunitySelect from '../forum/CommunitySelect';
import { bg_3 } from '@/global/var';
import FlatInput from '../forum/FlatInput';

const C = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        position: "relative",
        overflow: "hidden",
        color: '#fff',
        background: bg_3,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        margin: "0 auto",
        borderRadius: "24px",
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
        padding: '8px 16px',
    }),
    footer: css({
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: '8px',
    })

}


const EditGroup = ({ group, handleClose }: any) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [tree, setTree]: any = useRecoilState(communityTree)

    const layout = useRecoilValue(layoutSize)

    const onSubmit = async (data: any) => {

        setLoading(true)

        data.children = data.children.filter((item: string) => item !== '')
        data.public_id = group.public_id
        let res: any = await socketRequest('group-update', data)

        if (res.status === 'ok') {
            setRecoil(communityList, communityLTL(res.communitys))
            setRecoil(communityTree, communityLTT(res.communitys))
            handleClose()
        }
        setLoading(false)

    }
    const handleDelete = async () => {
        let req: any = await socketRequest('group-delete', { public_id: group.public_id })
        setTree((prevItems: any) => prevItems.filter((item: any) => item.id !== group.public_id));
        handleClose()
        // console.log(group.public_id, tree)

    }

    // setDefaultValues
    useEffect(() => {
        let currentChildren = group?.children?.map((child: any) => child.public_id)
        setValue('title', group?.title)
        setValue('children', currentChildren)
        setValue('color', group?.color)
    }, [group])

    if (!group) return (<></>)


    return (
        <Modal open={JSON.stringify(group) !== '{}'} onClose={handleClose} css={C.container} >
            <div css={[C.popup, { width: layout === 'desktop' ? '416px' : '100%' }]} >
                <div
                    onClick={handleClose}
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
                    <div css={header}>Edit Group</div>
                    <div css={subheader}>Group communitys to create seperate feeds</div>
                </div>

                <div css={C.content}>
                    <div css={forumLabel}>Group Name</div>
                    <FlatInput name='title' control={control} maxLength={30} />
                </div>


                <div css={C.content}>
                    <div css={forumLabel}>Group Color</div>
                    <ColorPicker control={control} />
                </div>


                <div css={C.content}>
                    <div css={forumLabel}>Communitys</div>
                    <CommunitySelect control={control} />
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
                        onClick={handleDelete}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Delete</LoadingButton>


                    <Button onClick={handleClose} color='secondary'>Cancel</Button>
                    <LoadingButton
                        sx={{ borderRadius: '8px' }}
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingIndicator="Running"
                        variant="contained"
                    >Update</LoadingButton>
                </div>

            </div>
        </Modal >
    )

}


export default EditGroup