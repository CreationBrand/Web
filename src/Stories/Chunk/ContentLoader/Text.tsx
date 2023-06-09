/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { contentFlow } from 'State/Flow';
import { hasSeen, see } from 'State/seenAtom';

import { memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { useRecoilValue } from 'recoil';
import rehypeRaw from 'rehype-raw';


const C = {

    container: css({
        position: 'relative',
        color: '#f2f3f5',
    }),
    tailed: css({
        maskImage: 'linear-gradient(180deg,#000 70%,transparent)',
        maxHeight: '340px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 500,
    }),

    grayed: css({
        color: '#b9b6ba !important',
    }),
}

const Text = ({ content, public_id }: any) => {

    const flow = useRecoilValue(contentFlow)
    const seen = useRecoilValue(hasSeen);
    let [grayed, setGrayed] = useState(false)

    useEffect(() => {
        setGrayed(seen(public_id))
    }, [])

    return (
        <div className='quill css-16jn0ui-Editor' css={[
            flow !== 'post' && C.tailed,
            (flow !== 'post' && grayed) && C.grayed
            , C.container]}>

            <ReactMarkdown
                children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>

    )
}


export default memo(Text)