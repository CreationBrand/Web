/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Badge } from "@mui/material";
import { Muted } from "Comps/Base/Text/Text";
import theme from "Global/Theme";
import Chip from "Stories/Chip/Chip";
import { bold, heading3, mutedBold, normal, smBold, smMuted, xsMuted } from "Stories/Text/Text";

const C = {
    container: css({
        height: '56px',
        width: '100%',
        maxWidth:'250px',
        overflow: 'hidden',
        display: 'flex',
        background: theme.background.tri,
        borderRadius: '8px',
        justifyContent: 'space-between',
        paddingLeft: '8px',
        paddingRight: '8px',
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
    content: css({
        width: 'calc(100% - 56px)',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '80px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
    roles: css({
        display: 'flex',
    }),
    status: css({
        background:'#66bb6a',
        borderRadius: '8px',
        width:'4px',
        marginRight: '4px',
        marginLeft: '4px',
        height:'28px',
    }),
}

const Person = ({ username, nickname, roles, route, public_id, status }: Props) => {

    let rolesArr = []

    for (var i in roles) {
        console.log(i)

        rolesArr.push(<Chip
            key={i}
            //@ts-ignore
            color={roles[i].color}
            //@ts-ignore
            title={roles[i].title}
            showBullet={false}
            clickable={false} />)
    }


    return <div id='person' css={C.container}>

        <div css={C.icon}>
            <img css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}.png`}></img>
        </div>

        <div css={C.content}>
            <div css={roles ? smBold : bold}>{nickname}</div>
            <div css={roles ? xsMuted : smMuted}>@{username}</div>

            {rolesArr.length !== 0 && <div css={C.roles}>{rolesArr}</div>}

        </div>

        {status && <div css={C.status} />}


    </div>
}


export default Person

interface Props {
    username: string
    nickname: string
    public_id: number
    roles?: []
    route?: string
    status?: 'active' | 'offline'
}