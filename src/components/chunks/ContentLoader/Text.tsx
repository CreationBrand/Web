/** @jsxImportSource @emotion/react */
import { bg_3, text_2, text_3 } from '@/global/var';
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
        width: "100%",
        maxHeight: "200px",
        overflow: "hidden",
        '&:after': {
            content: "\"\"",
            position: "absolute",
            top: "160px",
            left: "0",
            height: "40px",
            width: "100%",
            background: `linear-gradient(rgba(0,0,0,0), ${bg_3})`,
        }
    }),

}

const Text = ({ content, public_id, view }: any) => {
    const ref: any = useRef(null)
    const navigate = useNavigate();
    const [height, setHeight] = useState(0)
    useEffect(() => {


        if (!ref.current) return;

        setHeight(ref.current.clientHeight)
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
            style={{ color: text_2 }}
            ref={ref}
            css={[(view !== 'post' && height > 200) && C.tailed, C.container]}>
            {/* {(view !== 'post' && height > 200) && <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 100,
                color:text_3,
                fontSize: '12px',
            }}>View Full Post</div>} */}
            <ReactMarkdown className='text' children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>

    )
}


export default memo(Text)