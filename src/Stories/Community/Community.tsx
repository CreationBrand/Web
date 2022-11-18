/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import useSocketRequest from "Hooks/useSocketRequest";
import { useParams } from "react-router-dom";
import { useGetRecoilValueInfo_UNSTABLE, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { socketFlow } from "State/Flow";
import ComPreview from "Stories/ComPreview/ComPreview";
import ControlBar from "Stories/ControlBar/ControlBar";
import DynamicVirtual from "Stories/DynamicVirtual/DynamicVirtual";
import FilterBar from "Stories/FilterBar/FilterBar";
import { heading2, normal } from "Stories/Text/Text";

import { contentFlow } from 'State/Flow'
import { useEffect, useState } from "react";
import colorLog from "Util/colorLog";
import ListLoader from "Stories/ListLoader/ListLoader";
import { activeListData } from "State/Data";
import { socketRequest } from "Service/Socket";
import Post from "Stories/Post/Post";


const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
        overflow: 'hidden',
    }),
}


const Community = () => {

    // navagation
    let params = useParams();

    //state 
    let [page, setPage] = useState(0);
    let [activeList, setActiveList]: any = useRecoilState(activeListData);
    let [contentState, setFlow] = useRecoilState(contentFlow);

    // requests community data
    const [error, loading, data] = useSocketRequest('community', {community_id: params.community_id })

    useEffect(() => {
        if (data.status === 'ok') {
            colorLog('[STATE] Setting Content Flow', 'info')
            setFlow({
                type: 'community',
                title: data.community.title,
                public_id: data.community.public_id,
                roleSet: data.roleSet,
                roles: data.roles,
                page: 0,
            })
        }
    }, [data])


    useEffect(() => {
        (async () => {
            let req: any = await socketRequest('post-list', {
                community_id: params.community_id,
                filter: 'new',
                page: page,
            })
            if (req.status === 'ok') {
                //create posts
                let posts = []
                for (var i in req.posts) {
                    posts.push(<Post data={req.posts[i]} />)
                }
                if (page === 0) {
                    await setActiveList([<FilterBar />, posts])
                } else {
                    await setActiveList([...activeList, posts])
                }
            }
        })()
    }, [page, params.public_id])


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const list = [
        <ComPreview title={data.community.title} description={data.community.description} />,
        ...activeList,
        <ListLoader page={page} setPage={setPage} />]




    return (
        <div id="COMMUNITY" css={C.container}>
            <DynamicVirtual rows={list} />
            <ControlBar />
        </div>
    )
}


export default Community