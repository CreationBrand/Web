/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown"
import { useNavigate } from 'react-router-dom';
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
    const ref: any = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!ref.current) return;
        ref.current.addEventListener('click', (event: any) => {
            const target: any = event.target;
            target.setAttribute("contentEditable", false);
            if (event.target.className === 'mention') {
                event.preventDefault();
                const href = target.getAttribute('link');
                navigate(href);
            }
        });

    }, [])


    return (

        <div
            ref={ref}
            id={'text'}
            css={[view === 'list' && C.tailed, C.container]}>
            <ReactMarkdown className='text' children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>

    )
}


export default memo(Text)