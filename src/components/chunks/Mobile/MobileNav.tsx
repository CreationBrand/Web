/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search2 from '../Search/Search2'
import { iconButton } from '@/global/mixins'
import { useNavigate } from 'react-router-dom'
import { notificationStateFamily } from '@/state/data'
import { useRecoilValue } from 'recoil'
import styled from '@emotion/styled'
import { Badge, BadgeProps } from '@mui/material'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { bg_3, shadow_1 } from '@/global/var'

const C = {
    container: css({
        background: bg_3,
        width: '100%',
        boxShadow: shadow_1,
        display: 'flex',
        gap: '6px',
        paddingLeft: '8px',
        paddingRight: '8px',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 400,
        position: 'relative',
        height: '48px',

    }),

}


const StyledBadge = styled(Badge)<BadgeProps>({
    '& .MuiBadge-badge': {
        right: 6,
        top: 10,
        lineHeight: '10px',
        fontWeight: '600',
        fontSize: '10px',
        border: `3px solid #272732`,
        padding: '0px 2px',
        color: '#fff',
        zIndex: 200,
        background: '#af4141',
    },
});


const MobileNav = () => {

    const navigate = useNavigate()
    const submit = () => navigate(`/submit`)
    const noti = useRecoilValue(notificationStateFamily('noti'))
    const notif = () => navigate(`/notifications`)

    return <div css={C.container}>
        <div onClick={submit} css={iconButton}>
            <FontAwesomeIcon icon={faPlus} css={{ fontSize: '24px' }} />
        </div>
        <Search2 />
        <StyledBadge
            badgeContent={noti} invisible={!Boolean(noti)}>
            <div onClick={notif} css={iconButton}>
                <NotificationsRoundedIcon sx={{ fontSize: '24px' }} />
            </div>
        </StyledBadge>
    </div>
}




export default MobileNav