/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useForm, Controller } from "react-hook-form";
import { Divider, Button, FormControlLabel, Radio, RadioGroup, Input, Tab } from "@mui/material"
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate, useParams } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { setRecoil } from 'recoil-nexus';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BitSet from 'bitset';
import useCommunity from '@/hooks/useCommunity';
import FlatInput from '@/components/forum/FlatInput';
import ImageEditor from '@/components/forum/ImageEditor';
import RichInput from '@/components/forum/RichInput';
import Confirm from '@/components/popups/Confirm';
import { socketRequest } from '@/hooks/util/useSocket';
import { communityLTL, communityLTT } from '@/service/Clean';
import { contentFlow } from '@/state/flow';
import { communityList, communityTree } from '@/state/person';
import Pane from '@/layouts/Pane';
import { person as personData } from '@/state/person';
import { forumLabel, header, roundButton, section } from '@/global/mixins';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import CommunityPicker from '@/components/forum/CommunityPicker';
import DropZone from '@/components/forum/DropZone';
import { bg_3, bg_2 } from '@/global/var';
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
    role: css({
        padding: '8px 16px',
        height: '42px',
        display: 'flex',
        fontWeight: 'bold',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        borderRadius: '8px',
        border: '2px solid #181820',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            border: '2px solid #996ccc',
        }
    }),
    blob: css({
        height: '12px',
        width: '12px',
        borderRadius: '50%',
    }),


}


const EditCommunity = () => {

    let params = useParams()
    let navigate = useNavigate()

    const [loadings, error, component, req] = useCommunity(params.community_id)

    // state
    const person = useRecoilValue(personData);
    const contentState: any = useRecoilValue(contentFlow);
    const [role, setRole]: any = useState({})


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
            setRecoil(communityList, communityLTL(res.communitys))
            setRecoil(communityTree, communityLTT(res.communitys))
            navigate('/trending')
        }
    }


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => setRole({});

    const handleUpdate = () => { }



    if (!req) return <div>loading</div>

    return <Pane>

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
            <div css={header}>Edit Community</div>
            <LoadingButton
                loadingIndicator="Loading…"
                loading={loading}
                disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object) ||
                    (req.community?.title === changed.title &&
                        req.community?.description === changed.description &&
                        req.community?.public === changed.public) || Object.keys(changed).length === 0

                }
                disableElevation
                sx={roundButton}
                onMouseDown={onSubmit} variant='contained'
            >
                Update
            </LoadingButton>
        </section>

        <div css={{ background: bg_3, borderRadius: '8px', marginTop: '12px', padding: '8px 12px' }}>


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

            <section>
                <h4 css={forumLabel}>TITLE</h4>
                <FlatInput control={control} name="title" defaultValue={req?.community?.title} maxLength={22} />
            </section>

            <section>
                <h4 css={forumLabel}>DESCRIPTION</h4>
                <RichInput control={control} name="description" defaultValue={req?.community?.description} maxLength={800} />
            </section>



        </div>


        <div css={{ background: bg_3, borderRadius: '8px', marginTop: '12px', padding: '8px 12px' }}>


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



        </div>


    </Pane>

    // return <div css={C.pane}>
    //     <div css={C.container}>

    //         {/* <EditRole role={role} onClose={handleClose}></EditRole> */}

    //         <div css={C.inner}>




    //             <div css={C.row}>
    //                 <div css={{

    //                     color: '#fff',
    //                     fontSize: "20px",
    //                     fontWeight: 450,
    //                 }}>Edit {req?.community?.title}
    //                 </div>

    //                 <div css={{ display: 'flex' }}>

    //                     <div css={{
    //                         cursor: 'pointer', fontWeight: 600,
    //                         color: '#d7dadc', fontSize: '16px', lineHeight: '36px', marginRight: '8px',
    //                         '&:hover': {
    //                             color: '#fff',
    //                             textDecoration: 'underline',
    //                         }
    //                     }}>Reset</div>

    //                     <Button
    // disabled={!(Object.keys(errors)?.length === 0 && errors.constructor === Object) ||
    //     (req.community?.title === changed.title &&
    //         req.community?.description === changed.description &&
    //         req.community?.public === changed.public) || Object.keys(changed).length === 0

    // }
    //                         disableElevation
    //                         sx={{
    //                             marginLeft: '8px',
    //                             borderRadius: '8px',
    //                         }}
    //                         onMouseDown={onSubmit} variant='contained'>Update</Button>
    //                 </div>
    //             </div>


    //             <Divider sx={{ margin: '16px' }} />


    // <section css={{ padding: '16px 16px 0px 16px' }}>
    //     <div css={{
    //         margin: "6px 0px",
    //         fontWeight: "bold",
    //         fontSize: "18px",
    //         lineHeight: "22px",
    //         wordBreak: "normal",
    //         textDecoration: "none",
    //         color: '#fff',
    //     }}>Display</div>
    //     <div css={{
    //         fontWeight: "400",
    //         fontSize: "14px",
    //         lineHeight: "20px",
    //         wordBreak: "normal",
    //         textDecoration: "none",
    //         color: '#b9b6ba',
    //     }}>This is how users will see your community.</div>

    //             </section>

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <h3 css={textLabel('s')}>Title</h3>
    //                 <FlatInput control={control} name="title" defaultValue={req?.community?.title} maxLength={22} />
    //             </section>

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <h3 css={textLabel('s')}>description</h3>
    //                 <RichInput control={control} name="description" defaultValue={req?.community?.description} maxLength={800} />
    //             </section>

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <h3 css={textLabel('s')}>Visibility</h3>
    //                 <Controller
    //                     name='public'
    //                     control={control}
    //                     defaultValue={req?.community?.public}
    //                     render={({ field: { onChange, value }, formState: { errors } }) => (
    //                         <>
    //                             <RadioGroup
    //                                 value={value}
    //                                 onChange={onChange}
    //                             >
    //                                 <FormControlLabel
    //                                     sx={{
    //                                         margin: '0px',
    //                                         borderRadius: '8px',
    //                                         width: '100%',
    //                                         background: '#181820',
    //                                         color: '#f2f3f5 !important',
    //                                     }}
    //                                     value={false} control={<Radio />} label="Not Safe For Work" />
    //                                 <FormControlLabel
    //                                     sx={{
    //                                         margin: '0px',
    //                                         marginTop: '4px',
    //                                         borderRadius: '8px',
    //                                         width: '100%',
    //                                         color: '#f2f3f5 !important',
    //                                         background: '#181820',

    //                                     }}

    //                                     value={true} control={<Radio />} label="Safe For Work" />
    //                             </RadioGroup>
    //                         </>
    //                     )} />
    //             </section>


    //             <Divider sx={{ margin: '12px' }} />

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <div css={{
    //                     margin: "6px 0px",
    //                     fontWeight: "bold",
    //                     fontSize: "18px",
    //                     lineHeight: "22px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#fff',
    //                 }}>Images</div>
    //                 <div css={{
    //                     fontWeight: "400",
    //                     fontSize: "14px",
    //                     lineHeight: "20px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#b9b6ba',
    //                 }}>Avatars are 80px by 80px. Community Banners need a min height of 140px. JPEG / JPG ONLY </div>

    //             </section>

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <div css={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

    //                     <div>
    //                         <h3 css={textLabel('s')}>Avatar</h3>
    //                         <ImageEditor type='avatar' api='community-avatar' id={req?.community?.public_id} />
    //                         <div css={{ marginBottom: "26px" }} />
    //                     </div>

    //                     <div>
    //                         <div css={textLabel('s')}>Banner</div>
    //                         <ImageEditor
    //                             width='800'
    //                             height='140'
    //                             type='banner' api='community-banner' id={req?.community?.public_id} />
    //                         <div css={{ marginBottom: "26px" }} />
    //                     </div>

    //                 </div>
    //             </section>


    //             <Divider sx={{ margin: '12px' }} />

    //             <section css={{ padding: '16px 16px 0px 16px' }}>

    //                 <div css={{
    //                     margin: "6px 0px",
    //                     fontWeight: "bold",
    //                     fontSize: "18px",
    //                     lineHeight: "22px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#fff',
    //                 }}>Roles and Flairs</div>
    //                 <div css={{
    //                     fontWeight: "400",
    //                     fontSize: "14px",
    //                     lineHeight: "20px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#b9b6ba',
    //                 }}>Base Roles can not be edited or deleted.</div>
    //             </section>



    //             <section css={{ padding: '16px 16px 0px 16px' }}>

    //                 <div css={{ background: '#181820', borderRadius: '8px' }}>
    //                     {data.community_roles.map((role: any, index: any) => {
    //                         return (
    //                             <div
    //                                 style={{ color: role.base ? '#ffbf00' : '' }}
    //                                 onClick={() => {
    //                                     if (role.base) return
    //                                     setRole({
    //                                         title: role.title,
    //                                         color: role.color,
    //                                         bitSet: new BitSet(role.permissions),
    //                                         public_id: role.public_id,
    //                                     })
    //                                 }}
    //                                 data-value={index}
    //                                 key={role.public_id} css={C.role} >
    //                                 {role.color && <div css={C.blob} style={{ backgroundColor: "#" + role.color?.toString(16) }}></div>}
    //                                 {role.title}</div >
    //                         )
    //                     })}

    //                     <div
    //                         onClick={() => {
    //                             setRole({
    //                                 title: '',
    //                                 color: false,
    //                                 bitSet: new BitSet('000000'),
    //                                 public_id: '',
    //                             })
    //                         }}
    //                         key={'create-role'} css={C.role}> <AddCircleOutlineRoundedIcon /> Create New Role</div>

    //                 </div>


    //             </section>









    //             <section css={{ padding: '16px 16px 0px 16px' }}>

    //                 <div css={{
    //                     margin: "6px 0px",
    //                     fontWeight: "bold",
    //                     fontSize: "18px",
    //                     lineHeight: "22px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#fff',
    //                 }}>WARNING</div>
    //                 <div css={{
    //                     fontWeight: "400",
    //                     fontSize: "14px",
    //                     lineHeight: "20px",
    //                     wordBreak: "normal",
    //                     textDecoration: "none",
    //                     color: '#b9b6ba',
    //                 }}>Deletes are irreversible.</div>
    //             </section>

    //             <section css={{ padding: '16px 16px 0px 16px' }}>
    //                 <Confirm onDelete={handleDelete} />
    //             </section>

    //         </div>
    //     </div ></div>

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
