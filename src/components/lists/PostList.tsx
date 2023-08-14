
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { memo, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import AddComment from '../chunks/Comment/AddComment'



import { CommentHolder, FilterHolder, PostHolder } from './PlaceHolders'


//@ts-ignore
import { iconButton, iconButton, overList } from '@/global/mixins'
import useCommentList from '@/hooks/useCommentList'
import useCommunityData from '@/hooks/useCommunityData'
import usePost from '@/hooks/usePost'
import GlobalFilter from '../bits/filter/GlobalFilter'
import useLinkPost from '@/hooks/Link/useLinkPost'
import useIsMuted from '@/hooks/useIsMuted'
import { layoutSize, mainSize } from '@/state/layout'

import Swipper from '@/views/Swipper'
import NavMobile from '@/layouts/NavMobile'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Avatar from '../bits/Avatar'
import { text_1, text_3, text_tert } from '@/global/var'
import VirtuList from '../chunks/VirtualList/VirtuList'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TagMenu from '../menu/TagMenu'
import FilterMenu from '../menu/FilterMenu'
import CommunityPreview from '../chunks/Preview/CommunityPreview'
import { OverPaneD, OverPaneM } from '@/sections/OverPane'


const PostList = () => {

    const params: any = useParams()
    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components]: any = useCommentList(params.post_id)

    const cData = useCommunityData(params.community_id)
    const size = useRecoilValue(mainSize)
    const isMuted = useIsMuted(params.community_id)
    useLinkPost(params.post_id, true)

    const navigate = useNavigate()
    const layout = useRecoilValue(layoutSize)




    if (layout === 'mobile') return (
        <OverPaneM>



            <NavMobile >
                <div css={iconButton} onClick={() => { navigate(-1) }}> <ArrowBackRoundedIcon /></div>

                <div onClick={() => { navigate(`/c/${cData?.community?.public_id}`) }} css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Avatar public_id={cData?.community?.public_id} size={'tiny'} />
                    <div css={{ fontSize: '13px', color: text_tert, fontWeight: '600' }}>{cData?.community?.title}</div>
                </div>

                <div css={{ marginLeft: 'auto' }} />
                <div css={iconButton} onClick={() => navigate('./typeahead', { relative: "path" })} ><SearchRoundedIcon /></div>

                <FilterMenu />

            </NavMobile>




            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: 'easeInOut' }}>
                <VirtuList list={[<div css={{ height: '48px' }} />, component, ...components]} />
            </motion.div>

            <Outlet />
        </OverPaneM>)

    return (<OverPaneD>

        <VirtuList
            list={[component,
                <div key={'component'} css={{ margin: 'auto', marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
                    <AddComment isMuted={isMuted} post_id={params.post_id} parent_id={params.post_id} />
                </div>,
                ...components
            ]} />

        {size > 0 && <div css={{ height: 'min-content', marginTop: '12px' }}>
            {size === 1 ? null : <CommunityPreview {...cData} />}
            <GlobalFilter />
        </div>}

    </OverPaneD >)


}


export default memo(PostList)

