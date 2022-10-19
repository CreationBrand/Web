/** @jsxImportSource @emotion/react */

// import ButtonBase from "@mui/material/ButtonBase";
// import useRoute from "Hooks/useRoute";\

import { css } from '@emotion/react'
import { Label, Muted } from 'Comps/Base/Text/Text'
import theme from 'Global/theme'
import Chip from 'Stories/Chip/Chip'
import Icon from 'Stories/Icon/Icon'

const C = {

    container: css({
        height: '40px',
        margin: '2px 10px 2px 10px',
        borderRadius: '4px',
        display:'flex',
        alignItems:'center',
        padding:'0px 10px 0px 10px',
        '&:hover': {
            background: theme.background.tri
        }
    }),
    icon: css({}),
    title: css({
    
    }),
    chips: css({})
}

const CommunityElement = ({ props }: any) => {
    //   const { isRoute, reRoute } = useRoute(`community/${props.public_id}`);

    var handleClick = (e:any) => {
        e.stopPropagation()
        // reRoute(
        //   `community/${props.public_id}`,
        //   `${props.title}`,
        //   "community"
        // );

    }

    // var chips: any = []
    // for (var i in props.roles) {
    //     chips.push(
    //         <Chip
    //             key={i}
    //             title={props.roles[i].title}
    //             color={props.roles[i].color}
    //             showBullet={true}
    //             clickable={false}
    //         />
    //     )
    // }

    return (
        <div css={C.container} onClick={handleClick}>
            <Icon/>
            {/* <img
                css={C.icon}
                alt=" "
                src={`${process.env.REACT_APP_CLOUDFRONT}/community/preview/${props.title}`}
            /> */}
            <div css={C.title}>
                <div css={Label}>c/{props.title}</div>
            </div>
        </div>
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
