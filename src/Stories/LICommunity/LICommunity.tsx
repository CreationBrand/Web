/** @jsxImportSource @emotion/react */

// import ButtonBase from "@mui/material/ButtonBase";
// import useRoute from "Hooks/useRoute";\

import { css } from '@emotion/react'
import { Label, Muted } from 'Comps/Base/Text/Text'
import theme from 'Global/Theme'
import { Link, useLocation } from 'react-router-dom'
import Chip from 'Stories/Chip/Chip'
import Icon from 'Stories/Icon/Icon'
import { smBold } from 'Stories/Text/Text'

const CommunityElement = ({ props }: any) => {
    const location = useLocation()

    var handleClick = (e: any) => e.stopPropagation()

    const C = {
        container: css({
            height: '40px',
            margin: '2px 10px 2px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            padding: '0px 10px 0px 10px',
            background: location.pathname === `/c/${props.public_id}` ? 'hsla(0,0%,100%,.1)' : 'none',
            '&:hover': {
                background: theme.background.tri
            }
        }),
        title: css({
            marginLeft: '8px',
        }),
    }

    return (
        <Link to={`c/${props.public_id}`} onClick={handleClick} key={props.title}>
            <div css={C.container}>
                <Icon />
                <div css={C.title}>
                    <div css={smBold}>c/{props.title}</div>
                </div>
            </div>
        </Link>

    )
}

type Props = {
    props: props
}
type props = {
    public_id: number
    title: string
    description: string
    subscribers: number
    roles: any
    created_at: string
    updated_at: string
}

export default CommunityElement
