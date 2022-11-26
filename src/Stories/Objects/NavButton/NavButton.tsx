import { Button } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { mMuted, mNormal } from "Stories/Text/Text"

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"


const C = {
    icon: css({
        height: '32px',
        width: '32px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden',
    }),
    image: css({
        height: '32px',
        width: '32px',
        objectFit: 'cover',
    }),
}

const NavButton = ({ icon, label, path, avatar_id }: any) => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => navigate(`/${path}`)

    return (
        <Button
            onClick={handleClick}
            variant='text' size="large" color='secondary' fullWidth sx={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: '8px',
                paddingLeft: avatar_id ? '8px': '16px',
                height:'40px',
                gap: '12px',
                marginTop: '4px',
                
                background: location.pathname === `/${path}` ? `#343442` : 'transparent',
                color: location.pathname === `/${path}` ? `#fff` : null,

            }} >
            {icon && icon}
            {avatar_id && <div css={C.icon}>
                <img
                
                css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${avatar_id}.png`}></img>
            </div>}
            <div css={mNormal}>{label}</div>
        </Button>
    )
}


export default NavButton