/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Button, Tab } from "@mui/material"
import { useState } from "react";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { useRecoilValue } from "recoil";

import { personData } from 'State/Data';
import { socketRequest } from 'Service/Socket';
import { header, label, roundButton, section, textBold, textLabel } from 'Global/Mixins';

// ICONS
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import DropZone from 'Stories/Bits/DropZone/DropZone';
import { useNavigate } from 'react-router-dom';
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader';
import RichInput from 'Stories/Forum/RichInput';
import CommunityPicker from 'Stories/Forum/CommunityPicker';
import FlatInput from 'Stories/Forum/FlatInput';
import LiveComments from 'Stories/Alive/LiveComments';
import LiveViews from 'Stories/Alive/LiveViews';
import LiveVotes from 'Stories/Alive/LiveVotes';


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
        touchAction: 'pan-y',
        maxWidth: '800px',
        margin: '0 auto',
        overflowY: 'scroll',
        height: '100%',
    }),
    section: css({
        width: 'min-content',
        background: '#181820',
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
    const { register, handleSubmit, setError, watch, formState: { errors }, control } = useForm({ mode: 'onChange', resolver: joiResolver(schema) });
    const [loading, setLoading] = useState(false);
    const data = watch()
    const navigate = useNavigate()

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




    return (
        <div css={C.pane}>
            <div css={C.container}>




                <section css={{ padding: '12px 8px', borderRadius: '8px', marginTop: '12px' }}>
                    <div css={C.row}>
                        <div css={header}>Create a Post</div>
                        <LoadingButton
                            loadingIndicator="Loading…"
                            loading={loading}
                            disabled={Boolean(Object.keys(errors).length) || data.title === '' || data.community_id === undefined}
                            disableElevation
                            sx={roundButton}
                            onMouseDown={onSubmit} variant='contained'
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </section>

                {/* <Divider /> */}
                <div css={{ background: '#272732', borderRadius: '8px', marginTop: '12px', padding: '0px 0px 16px 0px', }}>
                    <section css={section}>
                        <h4 css={label}>SELECT A COMMUNITY</h4>
                        <CommunityPicker name="community_id" control={control} />
                    </section>

                    <section css={section}>
                        <h4 css={label}>TITLE</h4>
                        <FlatInput name='title' maxLength={150} control={control}></FlatInput>
                    </section>


                    <section css={section}>
                        <h4 css={label}>TYPE</h4>

                        <Controller
                            name="type"
                            control={control}
                            defaultValue="text"
                            render={({ field: { onChange, value } }) =>
                                <TabContext value={value}>
                                    <div css={C.section}>
                                        <TabList
                                            sx={{
                                                // fontFamily: 'noto sans',
                                                color: 'white',
                                                height: '40px !important',
                                            }}
                                            textColor="secondary"
                                            indicatorColor="secondary"
                                            onChange={(e, v) => { onChange(v) }}>
                                            <Tab label="Post" value="text"
                                                icon={<FeedRoundedIcon />}
                                                iconPosition="start"
                                            />
                                            <Tab label="Link" value="link"
                                                icon={<OpenInNewRoundedIcon />}
                                                iconPosition="start"
                                            />
                                            <Tab label="Upload" value="upload"
                                                icon={<BackupRoundedIcon />}
                                                iconPosition="start"

                                            />
                                        </TabList>
                                    </div>


                                    <section css={{ marginTop: 16 }}>
                                        <TabPanel
                                            sx={{ padding: '0' }}
                                            value="text" >
                                            <div css={textLabel('s')}>Content</div>
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
                                            <div css={textLabel('s')}>link</div>
                                            <FlatInput name='content' maxLength={300} control={control}></FlatInput>
                                        </TabPanel>
                                    </section>

                                </TabContext>
                            } />
                    </section>
                </div>


                <div css={{ background: '#272732', borderRadius: '8px', marginTop: '12px', padding: '0px 0px 16px 0px', }}>

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
                            <div css={textBold('x')}>{data.title && data.title}</div>
                            <ContentLoader type={data.type} content={data.content} />
                        </div>
                    </section>

                </div>


            </div >
        </div>
    )
}


export default Submit


/*
{
    type: 'image' | 'carosoul' 
    source :
}*/