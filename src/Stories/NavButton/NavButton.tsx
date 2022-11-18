import { Button } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { mMuted, mNormal } from "Stories/Text/Text"



const NavButton = ({ icon, label, path }: any) => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => navigate(`/${path}`)

    return (
        <Button
            onClick={handleClick}
            variant='text' size="large" color='secondary' fullWidth sx={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                borderRadius: '8px',
                paddingLeft: '16px',
                gap: '12px',
                marginTop: '4px',
                background: location.pathname === `/${path}` ? `#343442` : 'transparent',
                color: location.pathname === `/${path}` ? `#fff` : null,

            }} >
            {icon}
            <div css={mNormal}>{label}</div>
        </Button>
    )
}


export default NavButton