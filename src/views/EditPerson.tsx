/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm } from "react-hook-form";
import { Divider, Input, Button, TextareaAutosize, styled } from "@mui/material"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { person as personData } from '@/state/person';
import FlatInput from '@/components/forum/FlatInput';
import ImageEditor from '@/components/forum/ImageEditor';
import RichInput from '@/components/forum/RichInput';
import { header, roundButton, section, label, forumLabel } from '@/global/mixins';
import { socketRequest } from '@/hooks/util/useSocket';
import Pane from '@/layouts/Pane';
import { bg_3 } from '@/global/var';

// VALIDATION
const schema = Joi.object({
    nickname: Joi.string().min(4).max(22).required(),
    about_me: Joi.string().min(0).max(800).optional().default(null),
})


const C = {

    section: css({
        width: '100%',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto',
        background: bg_3,
        marginTop: '12px',
        padding: '0px 0px 16px 0px'
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
    theme: css({
        width: '50px',
        height: '50px',
        borderRadius: '50%',
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
        let req: any = await socketRequest('person-update', { ...changed })
        if (req.status === 'ok') {
            navigate(`/p/${person.public_id}`)
        }
        // else console.log('error')

    };

    if (!person) return <div>loading</div>




    return (<Pane>

        <section css={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '12px 8px',
            borderRadius: '8px',
            marginTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div css={header}>Edit Profile</div>
            <LoadingButton
                loadingIndicator="Loading…"
                loading={loading}
                disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object) ||
                    (person.nickname === changed.nickname &&
                        person.about_me === changed.about_me || Object.keys(changed).length === 0)
                }
                disableElevation
                sx={roundButton}
                onMouseDown={onSubmit} variant='contained'
            >
                Update
            </LoadingButton>
        </section>

        <div css={C.section}>
            <section css={section}>
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
                }}>This is how users will see your account.</div>


                <section css={{ padding: '0px 0px 16px 0px' }}>

                    <h3 css={forumLabel}>Username</h3>
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


                <section css={{ padding: '0px 0px 16px 0px' }}>
                    <h3 css={forumLabel}>Nickname</h3>
                    <FlatInput control={control} name="nickname" defaultValue={person.nickname} maxLength={22} />
                </section>


                <section css={{ padding: '0px 0px 16px 0px' }}>
                    <h3 css={forumLabel}>about me</h3>
                    <RichInput control={control} name="about_me" defaultValue={person.about_me} maxLength={800} />
                </section>


            </section>
        </div>



        <div css={C.section}>


            <section css={section}>
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
                }}>Notice only accepts JPG/JPEG files. Also will take a few minutes to update.</div>


                <section css={{ display: 'flex', gap: '8px' }} >
                    <div>
                        <h3 css={forumLabel}>Avatar</h3>
                        <ImageEditor type='avatar' api='person-avatar' id={person.public_id} />
                    </div>

                    <div>
                        <div css={forumLabel}>Banner</div>
                        <ImageEditor
                            width='800'
                            height='140'
                            type='banner' api='person-banner' id={person.public_id} />
                    </div>
                </section>



            </section>


        </div>


        <div css={C.section}>


            <section css={section}>
                <div css={{
                    margin: "6px 0px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    lineHeight: "22px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#fff',
                }}>Appearance</div>
                <div css={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "20px",
                    wordBreak: "normal",
                    textDecoration: "none",
                    color: '#b9b6ba',
                }}>Change how the app looks.</div>


                <section css={{ display: 'flex', gap: '8px' }} >
                    <div>
                        <h3 css={forumLabel}>Theme</h3>
                        <div css={{ display: 'flex', gap: '12px' }}>
                            <div css={C.theme} style={{ background: '#0b1416', border: '2px solid #538a9c' }} onClick={() => { localStorage.setItem("theme", "reddit"); window.location.reload() }}></div>
                            <div css={C.theme} style={{ background: '#272732', border: '2px solid #996ccc' }} onClick={() => { localStorage.setItem("theme", "dark"); window.location.reload() }}></div>
                            <div css={C.theme} style={{ background: '#313338', border: '2px solid#7289da' }} onClick={() => { localStorage.setItem("theme", "discord"); window.location.reload() }}></div>

                        </div>
                    </div>


                </section>



            </section>


        </div>


    </Pane>)

}


export default EditPerson


