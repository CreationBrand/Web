/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { heading3, mutedBold } from "Stories/Text/Text";



const C = {
    container: css({
        width: '300px',
        minHeight: '360px',
        background: '#0e0e10',
        borderRadius: '8px',
        position: 'relative',
        boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    }),
    banner: css({
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        width: '100%',
        background: '#9147ff',
    }),
    icon: css({
        height: '60px',
        width: '60px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden',

    }),
    bannerImg: css({
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        width: '100%',
        // objectFit: 'fill',

    }),
    image: css({
        height: '60px',
        width: '60px',
        objectFit: 'cover',

    }),
    content: css({
        margin: '12px',
        borderRadius: '8px',
        background: '#2f3136',
        display: 'flex',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',

    }),
}
const ProfilePopup = ({ username }: Props) => {

    return <div css={C.container}>

        <div css={C.banner}>
            <img css={C.bannerImg}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${username}.png`} />
        </div>

        <div css={C.content}>
            <div css={C.icon}>
                <img css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${username}.png`}></img>
            </div>

            <div>
                <div css={heading3}>UserName</div>
                <div css={mutedBold}>@UserName</div>
            </div>
        </div>




    </div>
}


export default ProfilePopup

interface Props {
    username: string
}