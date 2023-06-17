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
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { socketRequest } from 'Service/Socket';
import ImageEditor from 'Stories/Forum/ImageEditor';
import FlatInput from 'Stories/Forum/FlatInput';
import RichInput from 'Stories/Forum/RichInput';


// VALIDATION

const schema = Joi.object({
    nickname: Joi.string().min(4).max(30).required(),
    about_me: Joi.string().min(0).max(800).optional().default(null),
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
        touchAction: 'pan-y'

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
        padding: '16px 16px 0px 16px',
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

const EditPerson = () => {

    // state
    const person = useRecoilValue(personData);


    const navigate = useNavigate();
    // form
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const changed = watch()

    const onSubmit = async () => {
        console.log('submit', changed)
        let req: any = await socketRequest('person-update', { ...changed })
        if (req.status === 'ok') {
            navigate(`/p/${person.username}`)
        }
        // else console.log('error')

    };

    if (!person) return <div>loading</div>


    return <div css={C.container}>

        <div css={C.inner}>

            <div css={C.row}>
                <div css={{
                    color: '#fff',
                    fontSize: "20px",
                    fontWeight: 450,
                }}>Settings</div>
                <div>
                    <Button color='secondary'>Cancel</Button>
                    <Button
                        disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object) ||
                            (person.nickname === changed.nickname &&
                                person.about_me === changed.about_me || Object.keys(changed).length === 0)
                        }
                        disableElevation
                        sx={{
                            marginLeft: '8px',
                            borderRadius: '8px',
                        }}
                        onMouseDown={onSubmit} variant='contained'>Submit</Button>
                </div>
            </div>

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
                }}>Display</div>
                <div css={{
                    margin: "0px 0px 30px",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>This is how users will see your account.</div>
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <h3 css={textLabel('s')}>Username</h3>
                <Input
                    value={`@${person.username}`}
                    autoComplete="off"
                    disabled
                    disableUnderline
                    fullWidth
                    sx={{
                        height: "42px",
                    }} />
            </section>

            <section css={{ padding: '16px 16px 0px 16px' }}>
                <h3 css={textLabel('s')}>Nickname</h3>
                <FlatInput control={control} name="nickname" defaultValue={person.nickname} maxLength={22} />
            </section>


            <section css={{ padding: '16px 16px 0px 16px' }}>
                <h3 css={textLabel('s')}>about me</h3>
                <RichInput control={control} name="about_me" defaultValue={person.about_me} maxLength={800} />
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
                        <ImageEditor type='avatar' api='person-avatar' id={person.public_id} />
                        <div css={{ marginBottom: "26px" }} />
                    </div>

                    <div>
                        <div css={textLabel('s')}>Banner</div>
                        <ImageEditor
                            width='800'
                            height='140'
                            type='banner' api='community-banner' id={person.public_id} />
                        <div css={{ marginBottom: "26px" }} />
                    </div>

                </div>
            </section>

        </div>
    </div >

}


export default EditPerson

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

