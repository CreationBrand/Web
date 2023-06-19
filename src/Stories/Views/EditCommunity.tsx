/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, TextareaAutosize, styled, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";
import { communityListData, communityTreeData, personData } from 'State/Data';
import { textLabel } from 'Global/Mixins';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate, useParams } from 'react-router-dom';
import usePullCommunity from 'Hooks/usePullCommunity';
import { GridColDef } from '@mui/x-data-grid';
import RoleEditor from 'Stories/Forum/RoleEditor';
import useLiveData from 'Hooks/useLiveData';
import Confirm from 'Stories/Popups/Confirm';
import { socketRequest } from 'Service/Socket';
import { setRecoil } from 'recoil-nexus';
import { communityLTL, communityLTT } from 'Helper/Clean';
import FlatInput from 'Stories/Forum/FlatInput';
import RichInput from 'Stories/Forum/RichInput';
import ImageEditor from 'Stories/Forum/ImageEditor';


// VALIDATION
const schema = Joi.object({
    title: Joi.string().min(5).max(22).required(),
    description: Joi.string().min(5).max(800).required(),
    public: Joi.boolean().required(),
})


const C = {
    pane: css({
        width: '100%',
        height: '100%',
        background: '#0f0e10',
        touchAction: 'pan-y',
        zIndex: 200,
        position: 'relative',
        paddingTop: '8px',

    }),
    container: css({
        width: '100%',
        height: 'calc(100% - 56px)',
        padding: '22px 0px',
        scrollbarGutter: 'stable both-edges',
        overflow: 'auto',
        background: '#272732',
        marginTop: '8px',
        borderRadius: '8px',
        position: 'relative',

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
        padding: '16px 16px 0 16px',
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
    form: css({
        // padding: '40px 40px 32px',


        '@media only screen and (max-width: 800px)': {
            flex: '0 100%',
            padding: '0px',
        }
    }),



}


const EditCommunity = () => {


    let params = useParams()
    let navigate = useNavigate()

    const [loadings, error, component, req] = usePullCommunity(params.community_id)
    const data = useLiveData(true, `community:${params.community_id}`)

    console.log(req)

    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);

    const changed = watch();


    const onSubmit = async () => {
        let req: any = await socketRequest('community-update', { community_id: params.community_id, ...changed })
        if (req.status === 'ok') {
            navigate(`/c/${params.community_id}`)
        }

    };

    const handleDelete = async () => {
        let res: any = await socketRequest('community-delete', { community_id: params.community_id })
        if (res.status === 'ok') {
            setRecoil(communityListData, communityLTL(res.communitys))
            setRecoil(communityTreeData, communityLTT(res.communitys))
            navigate('/trending')
        }
    }


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    if (!req) return <div>loading</div>


    return <div css={C.pane}><div css={C.container}>

        <div css={C.inner}>


            <div css={C.row}>
                <div css={{

                    color: '#fff',
                    fontSize: "20px",
                    fontWeight: 450,
                }}>Edit {req?.community?.title}
                </div>

                <div css={{ display: 'flex' }}>

                    <div css={{
                        cursor: 'pointer', fontWeight: 600,
                        color: '#d7dadc', fontSize: '16px', lineHeight: '36px', marginRight: '8px',
                        '&:hover': {
                            color: '#fff',
                            textDecoration: 'underline',
                        }
                    }}>Reset</div>

                    <Button
                        disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object) ||
                            (req.community?.title === changed.title &&
                                req.community?.description === changed.description &&
                                req.community?.public === changed.public) || Object.keys(changed).length === 0

                        }
                        disableElevation
                        sx={{
                            marginLeft: '8px',
                            borderRadius: '8px',
                        }}
                        onMouseDown={onSubmit} variant='contained'>Update</Button>
                </div>
            </div>


            <Divider sx={{ margin: '16px' }} />


            <section css={{ padding: '16px 16px 0px 16px' }}>
                <div css={{
                    margin: "6px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    lineHeight: "22px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#fff',
                }}>Display</div>
                <div css={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>This is how users will see your community.</div>

            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>

                <h3 css={textLabel('s')}>Title</h3>
                <FlatInput control={control} name="title" defaultValue={req?.community?.title} maxLength={22} />
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <h3 css={textLabel('s')}>description</h3>
                <RichInput control={control} name="description" defaultValue={req?.community?.description} maxLength={800} />
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <h3 css={textLabel('s')}>Visibility</h3>
                <Controller
                    name='public'
                    control={control}
                    defaultValue={req?.community?.public}
                    render={({ field: { onChange, value }, formState: { errors } }) => (
                        <>
                            <RadioGroup
                                value={value}
                                onChange={onChange}
                            >
                                <FormControlLabel
                                    sx={{
                                        margin: '0px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        background: '#181820',
                                        color: '#f2f3f5 !important',
                                    }}
                                    value={false} control={<Radio />} label="Not Safe For Work" />
                                <FormControlLabel
                                    sx={{
                                        margin: '0px',
                                        marginTop: '4px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        color: '#f2f3f5 !important',
                                        background: '#181820',
                                        fontFamily: 'noto sans !important',

                                    }}

                                    value={true} control={<Radio />} label="Safe For Work" />
                            </RadioGroup>
                        </>
                    )} />
            </section>


            <Divider sx={{ margin: '12px' }} />

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <div css={{
                    margin: "6px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    lineHeight: "22px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#fff',
                }}>Images</div>
                <div css={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>Avatars are 80px by 80px. Community Banners need a min height of 140px. JPEG / JPG ONLY </div>

            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <div css={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

                    <div>
                        <h3 css={textLabel('s')}>Avatar</h3>
                        <ImageEditor type='avatar' api='community-avatar' id={req?.community?.public_id} />
                        <div css={{ marginBottom: "26px" }} />
                    </div>

                    <div>
                        <div css={textLabel('s')}>Banner</div>
                        <ImageEditor
                            width='800'
                            height='140'
                            type='banner' api='community-banner' id={req?.community?.public_id} />
                        <div css={{ marginBottom: "26px" }} />
                    </div>

                </div>
            </section>


            <Divider sx={{ margin: '12px' }} />

            <section css={{ padding: '16px 16px 0px 16px' }}>

                <div css={{
                    margin: "6px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    lineHeight: "22px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#fff',
                }}>Roles and Flairs</div>
                <div css={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>Base Roles can not be edited or deleted.</div>
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <RoleEditor roles={data.community_roles} public_id={data.public_id}></RoleEditor>
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>

                <div css={{
                    margin: "6px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    lineHeight: "22px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#fff',
                }}>WARNING</div>
                <div css={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>Deletes are irreversible.</div>
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <Confirm onDelete={handleDelete} />
            </section>

        </div>
    </div ></div>

}


export default EditCommunity






const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
    },
    {
        field: 'color',
        headerName: 'Color',
        flex: 1,
    },
    {
        field: 'permissions',
        headerName: 'Permissions',
        flex: 1,
    },
    {
        field: 'base',
        headerName: 'Base',
        flex: 1,
    },
];
