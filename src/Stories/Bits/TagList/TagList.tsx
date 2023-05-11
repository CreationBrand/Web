/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import exp from "constants"



const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        marginTop: '4px',
    }),
    box: css({
        height: '12px',
        width: '12px',
        borderRadius: '3px',

    }),
}
const TagList = ({ tags }: any) => {

    let list = []
    for (let i = 0; i < tags.length; i++) {
        list.push(<div
            style={{ backgroundColor: "#" + tags[i].color?.toString(16) }}
            css={C.box} key={tags[i].public_id} />
        )
    }




    return <div css={C.container}>{list}    </div>
}


export default TagList