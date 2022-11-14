/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { heading2, normal } from "Stories/Text/Text"
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


const ComPreview = ({ title, description }: any) => {

    return (
        <div css={C.pane} id='COMPREVIEW'>
            <div css={C.avatar}>
            </div>
            <div css={C.label}>
                <div css={heading2}>{title}</div>
                <div css={normal}>{description}</div>
            </div>
        </div>
    )
}



export default ComPreview