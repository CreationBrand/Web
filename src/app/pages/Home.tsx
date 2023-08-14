/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { memo, useEffect, useLayoutEffect, useState } from 'react'

import { Badge, BadgeProps, Button, IconButton, styled } from '@mui/material'

// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import Search2 from '@/components/chunks/Search/Search2'

import CommunityList from '@/components/lists/CommunityList'
import GlobalList from '@/components/lists/GlobalList'
import Left from '@/layouts/Left'
import Main from '@/layouts/Main'
import Nav from '@/layouts/Nav'
import Right from '@/layouts/Right'
import { layoutSize, desktopControl } from '@/state/layout'
import { Mobile } from '@/layouts/Mobile'
import { notificationStateFamily } from '@/state/data'
import MessengerTree from '@/components/chunks/VirtualTree/MessengerTree'
import MeMenu from '@/components/menu/MeMenu'
import GroupTree from '@/components/chunks/VirtualTree/GroupTree'
import GroupList from '@/components/lists/GroupList'
import { bg_2, text_2 } from '@/global/var'
import { iconButton } from '@/global/mixins'
import MeList from '@/components/lists/MeList'
import MobileNav from '@/components/chunks/Mobile/MobileNav'
import MainMobile from '@/layouts/MainMobile'
import SearchM from '@/components/chunks/Search/searchM'
import NavMobile from '@/layouts/NavMobile'
import Desktop from '@/layouts/Desktop'

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





const Home = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const layout = useRecoilValue(layoutSize)
    const [l, r] = useRecoilValue(desktopControl)
    const setTri: any = useSetRecoilState(desktopControl)
    const [last, setLast]: any = useState(false)

    const noti = useRecoilValue(notificationStateFamily('noti'))

    const submit = () => navigate(`/submit`)
    const notif = () => navigate(`/notifications`)

    useLayoutEffect(() => {
        let parts = location.pathname.split('/')
        if (location.pathname === '/popular') setLast('popular')
        else if (location.pathname === '/home') setLast('home')
        else if (location.pathname === '/me') setLast('me')
        else if (parts[1] === 'c' && parts.length === 3) setLast('community')
        else if (parts[1] === 'g' && parts.length === 3) setLast('group')
    }, [location])


    if (layout === 'mobile') return (
        <Mobile left={l} right={r}>

            <Left>
                <MeMenu />
                <MessengerTree />
            </Left>

            <MainMobile>

                <NavMobile>
                    <div onClick={submit} css={iconButton}><AddRoundedIcon sx={{ fontSize: '32px' }} /></div>
                    <SearchM />
                    <StyledBadge badgeContent={noti} invisible={!Boolean(noti)}>
                        <div css={iconButton} onClick={notif}><NotificationsRoundedIcon sx={{ fontSize: '26px' }} /> </div>
                    </StyledBadge>
                </NavMobile>

                {last === 'me' && <MeList />}
                {last === 'popular' && <GlobalList type="POPULAR" />}
                {last === 'home' && <GlobalList type="HOME" />}
                {last === 'community' && <CommunityList />}
                {last === 'group' && <GroupList />}
                <Outlet />

            </MainMobile>
            <Right>
                <GroupTree />
            </Right>


        </Mobile>
    )

    return (
        <Desktop left={l} right={r}>

            <Left>
                <MeMenu />
                <MessengerTree />
            </Left>

            <Main>
                <Nav>

                    <div onClick={() => setTri([!l, r])} css={iconButton}><LibraryBooksRoundedIcon fontSize='medium' /></div>

                    <Search2 />
                    <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>


                        <div onClick={submit} css={iconButton}><AddRoundedIcon sx={{ fontSize: '34px' }} /></div>



                        <StyledBadge badgeContent={noti} invisible={!Boolean(noti)}>
                            <div css={iconButton} onClick={notif}><NotificationsRoundedIcon sx={{ fontSize: '26px' }} /> </div>
                        </StyledBadge>



                        <IconButton
                            onClick={() => setTri([l, !r])}
                            disableRipple={true}
                            size="small"
                            color="secondary"
                            sx={{

                                ':hover': { color: '#fff' },
                                height: '32px',
                                width: '32px',

                            }}>
                            <FontAwesomeIcon css={{ color: text_2 }} icon={faLayerGroup} />
                        </IconButton>

                    </div>


                </Nav>

                {last === 'popular' && <GlobalList type="POPULAR" />}
                {last === 'me' && <MeList />}
                {last === 'home' && <GlobalList type="HOME" />}
                {last === 'community' && <CommunityList />}
                {last === 'group' && <GroupList />}
                <Outlet />

            </Main>
            <Right>
                <GroupTree />

            </Right>
        </Desktop>
    )
}

export default memo(Home)

