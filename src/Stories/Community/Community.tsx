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
import { useEffect } from "react";
import colorLog from "Util/colorLog";
import ListLoader from "Stories/ListLoader/ListLoader";


const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
    }),
}


const Community = () => {

    let params = useParams();
    let [contentState, setFlow] = useRecoilState(contentFlow);

    const [error, loading, data] = useSocketRequest('community', { public_id: params.public_id })


    useEffect(() => {
        if (data.status === 'ok') {
            colorLog('[STATE] Setting Content Flow', 'info')
            setFlow({
                type: 'community',
                title: data.community.title,
                public_id: data.community.public_id,
                roleSet: data.roleSet,
                roles: data.roles,
                list: [],
                page:0,
            })
        }
    }, [data, params.public_id])


    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>


    const list = [
        <ComPreview title={data.community.title} description={data.community.description} />,
        <FilterBar />,
        ...contentState.list,
        <ListLoader/>]


    return <div id="COMMUNITY" css={C.container}>

        <DynamicVirtual rows={list} />

        <ControlBar />

    </div>
}


export default Community