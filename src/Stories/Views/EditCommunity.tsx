/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Input, Button, TextareaAutosize, styled, } from "@mui/material"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { contentFlow } from "State/Flow";
import { personData } from 'State/Data';
import { textLabel } from 'Global/Mixins';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import ImageEditor from 'Stories/Forum/ImageEditor/ImageEditor';
import { useParams } from 'react-router-dom';
import usePullCommunity from 'Hooks/usePullCommunity';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


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
    const [error, component, req] = usePullCommunity(params.community_id)
    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);

    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const data = watch()

    const onSubmit = async () => {
        console.log(data)
        // let req = await socketRequest('post-new', data)

    };




    console.log(req)



    if (!req) return <div>loading</div>


    return <div css={C.container}>

        <div css={C.inner}>

            <div css={C.row}>
                <div css={{
                    color: '#fff',
                    fontSize: "20px",
                    fontWeight: 450,
                }}>Edit {req.community.title}</div>
                <div>
                    <Button color='secondary'>Cancel</Button>
                    <Button
                        disabled={!(Object.keys(errors).length === 0 && errors.constructor === Object)}
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
                    defaultValue={req.community.title}
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
                            }}>{value.length}/30</div>}
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
                                }}>{value.length}/200</div>}

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



            <Box sx={{ width: '100%', background: '#181820', borderRadius: '8px' }}>
                <DataGrid
                    checkboxSelection={false}
                    autoHeight
                    hideFooter
                    editMode='row'
                    isCellEditable={() => false}
                    css={{ borderRadius: '8px' }}
                    rows={req?.community?.community_roles}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>




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

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
// ];


