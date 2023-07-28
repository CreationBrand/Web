
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// @ts-ignore
import src from "@/assets/Logo192x192.png";
import { bg_3, bg_4, bg_active } from "@/global/var";

const C = {
    container: css({
        height: '56px',
        width: '100%',
        display: 'flex',
        background: bg_active,
        borderRadius: '12px',
        paddingLeft: '8px',
        paddingRight: '8px',
        alignItems: 'center',
        gap: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px',
    }),
    img: css({
        width: '40px',
        height: '40px',
        borderRadius: '12px',
    }),
    header: css({
        color: '#fff',
        fontSize: '20px',
        letterSpacing: '1px',
        lineHeight: '20px',
        fontWeight: '800',
        marginBottom: '2px',
    }),
    sub: css({
        color: "#f2f3f5",
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '12px',
    }),
}



const LogoWithName = () => {

    return (
        <div css={C.container}>
            <img alt={'logo'} css={C.img} src={src} />
            <div>
                <div css={C.header}>ARTRAM</div>
                <div css={C.sub}>alpha - v1</div>
            </div>
        </div>
    )
}


export default LogoWithName