/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { bold, normal, smBold, smMuted } from "Stories/Text/Text"
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Icon from 'Stories/Icon/Icon'
import { Button } from "@mui/material"
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';


const C = {
    container: css({
        background: '#36393f',
        width: '100%',
        margin: '20px',
        borderRadius: '4px',
    }),
    header: css({
        display: 'flex',
        padding: '8px',
        gap: '4px',
        alignItems: 'center',
    }),
    footer: css({
        height: '32px',
        display: 'flex',
    }),
}

const Post = ({ data }: any) => {


    console.log(data)


    return <div id='POST' css={C.container}>

        <div css={C.header}>
            <Icon />
            <div css={bold}>{data.author.nickname}</div>
            {/* {props.title} */}
        </div>

        <div css={smBold}>{data.title}</div>
        <div css={normal}>{data.content}</div>


        <div css={C.footer}>
            <Button variant="text" color="secondary" size="small">
                <ThumbUpAltOutlinedIcon
                    fontSize="small"
                />

            </Button>
            <Button variant="text" color="secondary" size="small">
                <ThumbDownOffAltRoundedIcon
                    fontSize="small"
                />
                23
            </Button>

            <Button variant="text" color="secondary" size="small">
                <ModeCommentOutlinedIcon
                    fontSize="small"
                />
                23
            </Button>



        </div>


    </div>


}



export default Post