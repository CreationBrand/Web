/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { bold, lBold, lNormal, mBold, mMuted, mNormal, normal, smBold, smMuted, sMuted, sNormal, xBold, xsLabel, xsMuted } from "Stories/Text/Text"
import { Button, IconButton } from "@mui/material"
import theme from "Global/Theme";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";
import { vote } from "Helper/Action";
const C = {
    container: css({
        background: theme.background.qua,
        width: '100%',
        margin: '10px 20px',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
    }),
    header: css({
        display: 'flex',

        gap: '4px',
        alignItems: 'center',
    }),


    icon: css({
        height: '40px',
        width: '40px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden',
    }),
    image: css({
        height: '40px',
        width: '40px',
        objectFit: 'cover',
    }),
    title: css({
        padding: '8px 0px',
        fontWeight: '400',

    }),
    left: css({
        width: '56px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        // alignItems: 'center',
    }),
    right: css({
        width: '100%',
    }),
    row: css({
        display: 'flex',
        alignItems: 'center',
        height: '20px',
        gap: '4px',
    }),
    menu: css({
        marginLeft: 'auto',
    }),
    action: css({
        width: '40px',
        borderRadius: '8px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
        minWidth: '20px',
        height: '25px',
    }),
    vote: css({
        display: 'flex',
        background: theme.background.tri,
        flexDirection: 'column',
        borderRadius: '8px',
        width: '40px',
        alignItems: 'center',
    }),
}

const Post = ({ data }: any) => {

    const navigate = useNavigate();
    const viewPost = () => navigate(`p/${data.public_id}`)

    const handleUp = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(value)
        vote(1, 'post', data.public_id)

    }
    const handleDown = (e: any) => {
        e.stopPropagation()
        e.preventDefault();

    }



    console.log(data)

    if (data.public_id === 'undefined') return <div>loading</div>

    return (

        <div id='POST' css={C.container} onClick={viewPost}>
            <div css={C.left}>
                <div css={C.icon}>
                    <img css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${data.author.public_id}.png`}></img>
                </div>
                <div css={C.vote}>
                    <Button css={C.action} variant="text" color="secondary" size="small" onClick={handleUp}>
                        <ArrowDropUpRoundedIcon fontSize="small" />
                    </Button>
                    <div css={mMuted}> {data.karma} </div>
                    <Button css={C.action} variant="text" color="secondary" size="small" onClick={handleDown}>
                        <ArrowDropDownRoundedIcon fontSize="small" />
                    </Button>
                </div>
            </div>


            <div css={C.right}>
                <div css={C.row}>
                    <div css={lBold}>{data.author.nickname}</div>
                    <div css={sNormal}>@badwithawp</div>
                    <IconButton css={C.menu} color='secondary' size="small">
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <div css={C.row}>
                    <div css={sMuted}>
                        {formatDistance(parseISO(data.created_at), new Date(), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
                <div css={[C.title, xBold]}>
                    {data.title}
                </div>
                <div css={[mNormal]}>
                    {data.content}
                </div>

            </div>

        </div>
    )


}



export default Post