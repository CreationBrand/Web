/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, TextareaAutosize, styled, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";
import { communityListData, communityTreeData, personData } from 'State/Data';
import { textBold, textLabel } from 'Global/Mixins';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import ImageEditor from 'Stories/Forum/ImageEditor/ImageEditor';
import { useNavigate, useParams } from 'react-router-dom';
import usePullCommunity from 'Hooks/usePullCommunity';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import RoleEditor from 'Stories/Forum/RoleEditor';
import useLiveData from 'Hooks/useLiveData';
import Confirm from 'Stories/Popups/Confirm';
import { socketRequest } from 'Service/Socket';
import { setRecoil } from 'recoil-nexus';
import { communityLTL, communityLTT } from 'Helper/Clean';


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
const StyledTextarea = styled(TextareaAutosize)(() => ``)

const EditCommunity = () => {


    let params = useParams()
    let navigate = useNavigate()

    const [loadings, error, component, req] = usePullCommunity(params.community_id)
    const data = useLiveData(true, `community:${params.community_id}`)


    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        // console.log(data)

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


    return <div css={C.container}>

        <div css={C.inner}>

            <div css={C.row}>
                <div css={{
                    color: '#fff',
                    fontSize: "20px",
                    fontWeight: 450,
                }}>Edit {req?.community?.title}</div>
                <div>
                    <Button color='secondary'>Cancel</Button>
                    <Button
                        disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object)}
                        disableElevation
                        sx={{
                            marginLeft: '8px',
                            borderRadius: '8px',
                        }}
                        onMouseDown={onSubmit} variant='contained'>Submit</Button>
                </div>
            </div>

            <Divider sx={{ margin: '12px' }} />


            <form
                css={C.form}>



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
                    margin: "0px 0px 30px",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>This is how users will see your community.</div>


                <h3 css={textLabel('s')}>Title</h3>

                <Controller
                    name="title"
                    control={control}
                    defaultValue={req?.community?.title}
                    rules={{ required: true, maxLength: 30 }}
                    render={({ field: { onChange, value } }) => (
                        <Input

                            error={errors.title ? true : false}
                            autoComplete="off"
                            onChange={onChange}
                            value={value}
                            disableUnderline
                            fullWidth
                            endAdornment={<div css={{
                                color: '#b9b6ba',
                                marginRight: '8px',
                                fontSize: '12px'
                            }}>{value?.length}/30</div>}
                            sx={{
                                height: "42px",
                                marginBottom: "26px",
                            }}
                        />
                    )}
                />


                <h3 css={textLabel('s')}>description</h3>
                <div>
                    <Controller
                        name="description"

                        control={control}
                        defaultValue=""
                        rules={{ required: true, maxLength: 200 }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                disableUnderline
                                multiline
                                fullWidth
                                minRows={3}
                                placeholder="Type a description..."
                                onChange={onChange}
                                value={value}

                                //@ts-ignore
                                endAdornment={<div css={{
                                    top: '8px',
                                    right: '8px',
                                    color: '#b9b6ba',
                                    marginRight: '8px',
                                    fontSize: '12px'
                                }}>{value?.length}/200</div>}

                            />
                        )}
                    />
                </div>
            </form>

            <Divider sx={{ margin: '12px' }} />


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
                margin: "0px 0px 30px",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                wordBreak: "normal",
                textDecoration: "none",
                color: '#b9b6ba',
            }}>Avatars are 80px by 80px. Community Banners need a min height of 140px. </div>



            <div css={{ display: 'flex', gap: '12px' }}>

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

            <Divider sx={{ margin: '12px' }} />



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
                margin: "0px 0px 30px",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                wordBreak: "normal",
                textDecoration: "none",
                color: '#b9b6ba',
            }}>Base Roles can not be edited or deleted.</div>

            <RoleEditor roles={data.community_roles} public_id={data.public_id}></RoleEditor>


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
                margin: "0px 0px 30px",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "20px",
                wordBreak: "normal",
                textDecoration: "none",
                color: '#b9b6ba',
            }}>Deletes are irreversible.</div>

            <Confirm onDelete={handleDelete} />

        </div>
    </div >

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
