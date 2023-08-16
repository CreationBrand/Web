/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Tab } from "@mui/material"
import { useState } from "react";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";


// ICONS
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import ContentLoader from '@/components/chunks/ContentLoader/ContentLoader';
import CommunityPicker from '@/components/forum/CommunityPicker';
import FlatInput from '@/components/forum/FlatInput';
import RichInput from '@/components/forum/RichInput';
import { header, roundButton, section, label, forumLabel, iconButton } from '@/global/mixins';
import { socketRequest } from '@/hooks/util/useSocket';
import { person as personData } from '@/state/person';
import DropZone from '@/components/forum/DropZone';
import Pane from '@/layouts/Pane';
import { bg_1, bg_2, bg_3, bg_forum } from '@/global/var';
import { layoutSize } from '@/state/layout';
import { OverPaneD, OverPaneM } from '@/sections/OverPane';
import { motion } from 'framer-motion';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// VALIDATION
const schema = Joi.object({
    title: Joi.string().min(5).max(150).required(),
    community_id: Joi.string().min(10).required(),
    type: Joi.string().required().valid('text', 'link', 'upload'),
    content: Joi.alternatives()
        .conditional('type', [
            { is: 'text', then: Joi.string() },
            { is: 'link', then: Joi.string().uri().required() },
            { is: 'upload', then: Joi.any() }])
})


const C = {
    pane: css({
        width: '100%',
        height: 'calc(100% - 56px)',
        background: '#0f0e10',
        zIndex: 200,
        position: 'relative',
        overflow: 'hidden',
    }),
    container: css({
        maxWidth: '800px',
        margin: '0 auto',
    }),
    section: css({
        width: 'min-content',
        background: bg_3,
        borderRadius: '8px',
    }),
    wrapper: css({
        padding: '8px',
    }),
    row: css({
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'baseline',
        alignItems: 'center',

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
}

const Submit = () => {

    // state
    const person = useRecoilValue(personData);

    // form
    const { register, handleSubmit, setError, watch, setValue, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const data = watch()
    const navigate = useNavigate()
    const layout = useRecoilValue(layoutSize);
    const onSubmit = async () => {
        setLoading(true)
        console.log(data)
        let req: any = await socketRequest('post-new', data)
        if (req.status === 'ok') {
            navigate(`/c/${data.community_id}`)
        }
        else if (req.status === 'error') setError('community_id', { message: req.message })
        setLoading(false)
    };


    if (layout === 'mobile') return (<OverPaneM>


        <motion.div
            css={{ padding: '12px 8px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: 'easeInOut' }}>


            <section css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div css={iconButton} onClick={() => navigate(-1)}><CancelRoundedIcon /></div>

                <div css={header}>Create Post</div>

                <LoadingButton
                    loadingIndicator="Loading…"
                    loading={loading}
                    disabled={Boolean(Object.keys(errors).length) || data.title === '' || data.community_id === undefined}
                    disableElevation
                    sx={roundButton}
                    onMouseDown={onSubmit}
                    variant='contained'
                >
                    Create
                </LoadingButton>
            </section>

            <h4 css={forumLabel}>SELECT A COMMUNITY</h4>
            <CommunityPicker name="community_id" control={control} />

            <h4 css={forumLabel}>TITLE</h4>
            <FlatInput name='title' maxLength={150} control={control}></FlatInput>

            <h4 css={forumLabel}>TYPE</h4>
            <Controller
                name="type"
                control={control}
                defaultValue="text"
                render={({ field: { onChange, value } }) =>
                    <TabContext value={value}>
                        <div css={C.section}>
                            <TabList
                                sx={{
                                    background: bg_forum,
                                    borderRadius: '8px',
                                    color: 'white',
                                    height: '40px !important',
                                    overflow: 'hidden',
                                    minHeight: '40px !important',
                                    fontSize: '12px !important',
                                }}
                                textColor="secondary"
                                indicatorColor="secondary"
                                onChange={(e, v) => { onChange(v); setValue('content', '') }}>
                                <Tab
                                    sx={{
                                        height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                    }}
                                    label="Post" value="text"
                                    icon={<FeedRoundedIcon />}
                                    iconPosition="start"
                                />
                                <Tab
                                    sx={{
                                        height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                    }}
                                    label="Link" value="link"
                                    icon={<OpenInNewRoundedIcon />}
                                    iconPosition="start"
                                />
                                <Tab
                                    sx={{
                                        height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                    }}
                                    label="Upload" value="upload"
                                    icon={<BackupRoundedIcon />}
                                    iconPosition="start"

                                />
                            </TabList>
                        </div>


                        <section css={{ marginTop: 16 }}>
                            <TabPanel
                                sx={{ padding: '0' }}
                                value="text" >
                                <div css={forumLabel}>Content</div>
                                <RichInput
                                    name='content'
                                    control={control}
                                    maxLength={10000} />

                            </TabPanel>
                        </section>


                        <section css={{ marginTop: 16 }}>
                            <TabPanel
                                sx={{ padding: '0' }}
                                value="upload">
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field: { onChange, value } }) =>
                                        <DropZone
                                            value={value}
                                            onChange={onChange}
                                        />

                                    }
                                />
                            </TabPanel>
                        </section>


                        <section css={{ marginTop: 16 }}>
                            <TabPanel value="link" sx={{ padding: 0 }}>
                                <div css={forumLabel}>link</div>
                                <FlatInput name='content' maxLength={300} control={control}></FlatInput>
                            </TabPanel>
                        </section>

                    </TabContext>
                } />


            <h4 css={forumLabel}>PREVIEW</h4>

            <div css={{
                maxWidth: '800px', width: '100%', overflow: 'hidden',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                gap: '8px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div css={{
                    all: 'unset',
                    color: '#f2f4f5',
                    fontSize: '20px',
                    lineHeight: '24px',
                    fontWeight: 'bold',
                }}>{data.title && data.title}</div>
                <ContentLoader type={data.type} content={data.content} />
            </div>


        </motion.div>

    </OverPaneM>)


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
            <div css={header}>Create Post</div>
            <LoadingButton
                loadingIndicator="Loading…"
                loading={loading}
                disabled={Boolean(Object.keys(errors).length) || data.title === '' || data.community_id === undefined}
                disableElevation
                sx={roundButton}
                onMouseDown={onSubmit}
                variant='contained'
            >
                Create
            </LoadingButton>
        </section>


        <div css={C.container}>







            <div css={{
                background: bg_3, borderRadius: '8px', marginTop: '12px', padding: '8px 12px',
            }}>
                <section>
                    <h4 css={forumLabel}>SELECT A COMMUNITY</h4>
                    <CommunityPicker name="community_id" control={control} />
                </section>

                <section>
                    <h4 css={forumLabel}>TITLE</h4>
                    <FlatInput name='title' maxLength={150} control={control}></FlatInput>
                </section>


                <section>
                    <h4 css={forumLabel}>TYPE</h4>

                    <Controller
                        name="type"
                        control={control}
                        defaultValue="text"
                        render={({ field: { onChange, value } }) =>
                            <TabContext value={value}>
                                <div css={C.section}>
                                    <TabList
                                        sx={{
                                            background: bg_forum,
                                            borderRadius: '8px',
                                            color: 'white',
                                            height: '40px !important',
                                            overflow: 'hidden',
                                            minHeight: '40px !important',
                                            fontSize: '12px !important',
                                        }}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        onChange={(e, v) => { onChange(v); setValue('content', '') }}>
                                        <Tab
                                            sx={{
                                                height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                            }}
                                            label="Post" value="text"
                                            icon={<FeedRoundedIcon />}
                                            iconPosition="start"
                                        />
                                        <Tab
                                            sx={{
                                                height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                            }}
                                            label="Link" value="link"
                                            icon={<OpenInNewRoundedIcon />}
                                            iconPosition="start"
                                        />
                                        <Tab
                                            sx={{
                                                height: '40px !important', paddingBottom: '40px', fontSize: '12px !important',
                                            }}
                                            label="Upload" value="upload"
                                            icon={<BackupRoundedIcon />}
                                            iconPosition="start"

                                        />
                                    </TabList>
                                </div>


                                <section css={{ marginTop: 16 }}>
                                    <TabPanel
                                        sx={{ padding: '0' }}
                                        value="text" >
                                        <div css={forumLabel}>Content</div>
                                        <RichInput
                                            name='content'
                                            control={control}
                                            maxLength={10000} />

                                    </TabPanel>
                                </section>


                                <section css={{ marginTop: 16 }}>
                                    <TabPanel
                                        sx={{ padding: '0' }}
                                        value="upload">
                                        <Controller
                                            name="content"
                                            control={control}
                                            render={({ field: { onChange, value } }) =>
                                                <DropZone
                                                    value={value}
                                                    onChange={onChange}
                                                />

                                            }
                                        />
                                    </TabPanel>
                                </section>


                                <section css={{ marginTop: 16 }}>
                                    <TabPanel value="link" sx={{ padding: 0 }}>
                                        <div css={forumLabel}>link</div>
                                        <FlatInput name='content' maxLength={300} control={control}></FlatInput>
                                    </TabPanel>
                                </section>

                            </TabContext>
                        } />
                </section>
            </div>


            <div css={{ background: bg_3, borderRadius: '8px', marginTop: '12px', padding: '0px 0px 16px 0px', }}>

                <section css={section}>
                    <h4 css={label}>PREVIEW</h4>

                    <div css={{
                        maxWidth: '800px', width: '100%', overflow: 'hidden',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        gap: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div css={{
                            all: 'unset',
                            color: '#f2f4f5',
                            fontSize: '20px',
                            lineHeight: '24px',
                            fontWeight: 'bold',
                        }}>{data.title && data.title}</div>
                        <ContentLoader type={data.type} content={data.content} />
                    </div>
                </section>

            </div>


        </div >
    </Pane >
    )
}


export default Submit


