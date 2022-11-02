/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import useSocketRequest from "Hooks/useSocketRequest";
import { useParams } from "react-router-dom";
import { useGetRecoilValueInfo_UNSTABLE, useRecoilValue } from "recoil";
import { socketFlow } from "State/Flow";
import { heading2, normal } from "Stories/Text/Text";


const C = {
    pane: css({
        width: "100%",
        height: "200px",
        background: '#151618',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: '24px',
    }),
    avatar: css({
        width: "100px",
        height: "60px",
        background: '#292b2f',
        borderRadius: '4px',
    }),
    label: css({
        height: '60px',
        marginLeft: '24px',
    }),
}


const Community = () => {


    let params = useParams();
    
    const [error, loading, data] = useSocketRequest('community', { public_id: params.public_id })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    

    return <div>

        <div css={C.pane}>

            {/* image */}
            <div css={C.avatar}>
            </div>

            <div css={C.label}>

                <div css={heading2}>{data.community.title}</div>
                <div css={normal}>{data.community.description}</div>
            </div>
            {/* <div css={C.settings}></div> */}

        </div>



    </div>
}


export default Community