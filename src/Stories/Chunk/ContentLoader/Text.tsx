/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { contentFlow } from 'State/Flow';
import { hasSeen } from 'State/seenAtom';

import { memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { useRecoilValue } from 'recoil';
import rehypeRaw from 'rehype-raw';


const C = {

    container: css({
        position: 'relative',
        color: '#f2f3f5',
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        wordBreak: 'break-word',
    }),

    tailed: css({
        position: "relative",
        width: "300px",
        maxHeight: "300px",
        overflow: "hidden",
        '&:after': {
            content: "\"\"",
            position: "absolute",
            top: "260px",
            left: "0",
            height: "40px",
            width: "100%",
            background: "linear-gradient(rgba(0,0,0,0), #272732)",
        }
    }),

}

const Text = ({ content, public_id, view }: any) => {

    return (
        <div
            id={'text'}
            css={[view === 'list' && C.tailed, C.container]}>
            <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>

    )
}


export default memo(Text)