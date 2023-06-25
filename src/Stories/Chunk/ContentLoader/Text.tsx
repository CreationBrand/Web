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
        maskImage: 'linear-gradient(180deg,#000 70%,transparent)',
        maxHeight: '340px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 500,
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