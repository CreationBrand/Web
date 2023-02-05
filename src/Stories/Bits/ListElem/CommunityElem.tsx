


import { Button } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { mMuted, mNormal } from "Stories/Bits/Text/Text"

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Avatar from "../Avatar/Avatar";


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

// created_at
// description
// public_id
// roles
// subscribers
// title
// updated_at


const CommunityElem = ({ public_id, title, members, description }: any) => {

    // const navigate = useNavigate();
    // const location = useLocation();
    // const handleClick = () => navigate(`/${path}`)

    return (
        <Button
            // onClick={handleClick}
            variant='text' size="large" color='secondary' fullWidth sx={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: '8px',
                paddingLeft: public_id ? '8px' : '16px',
                height: '40px',
                gap: '12px',
                marginTop: '4px',
                background: 'transparent',

            }} >
            <Avatar size='small' public_id={public_id} />
            <div>
                <div css={mNormal}>{title}</div>
            </div>
        </Button>
    )
}


export default CommunityElem