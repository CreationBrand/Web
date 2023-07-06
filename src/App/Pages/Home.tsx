/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import MessengerTree from 'Stories/Chunk/VirtualTree/MessengerTree'
import GroupTree from 'Stories/Chunk/VirtualTree/GroupTree'
import MeMenu from 'Stories/Menu/MeMenu'
import Tri, { Mobile } from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { layoutSizeData, notificationStateFamily } from 'State/Data'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import Right from 'Stories/Layout/Right'
import { Badge, BadgeProps, IconButton, styled } from '@mui/material'

// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import GroupList from 'Stories/Chunk/Lists/GroupList'
import Search2 from 'Stories/Chunk/Search/Search2'
import { iconButton } from 'Global/Mixins'
import useWindow from 'Hooks/useWindow'


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
    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)
    const noti = useRecoilValue(notificationStateFamily('noti'))
    const [layout, setLayoutSize] = useRecoilState(layoutSizeData)

    const submit = () => navigate(`/submit`)
    const notif = () => navigate(`/notifications`)

    const [last, setLast]: any = useState(false)
    const [id, setId]: any = useState(false)

    const location = useLocation()


    const { width, height } = useWindow()
    //runs on every size change (very inefficient)
    useLayoutEffect(() => {
        if (width < 800 && layout !== 'mobile') setLayoutSize('mobile')
        if (width > 800 && layout !== 'desktop') setLayoutSize('desktop')
    }, [width])



    useEffect(() => {
        let parts = location.pathname.split('/')
        if (location.pathname === '/trending') setLast('trending')
        else if (location.pathname === '/home') setLast('home')
        else if (parts[1] === 'c' && parts.length === 3) setLast('community')
        else if (parts[1] === 'g' && parts.length === 3) {
            setLast('group')
            setId(parts[2])
        }
    }, [location])


    if (layout === 'mobile') return (
        <Mobile left={l} right={r}>

            <Left>
                <MeMenu />
                <MessengerTree />
            </Left>

            <Main>
                <Nav>
                    <div onClick={submit} css={iconButton}>
                        <FontAwesomeIcon icon={faPlus} css={{ fontSize: '26px' }} />
                    </div>
                    <Search2 />
                    <StyledBadge
                        badgeContent={noti} invisible={!Boolean(noti)}>
                        <div onClick={notif} css={iconButton}>
                            <NotificationsRoundedIcon sx={{ fontSize: '26px' }} />
                        </div>
                    </StyledBadge>
                </Nav>
                <>
                    {last === 'trending' && <GlobalList type="trending" />}
                    {last === 'home' && <GlobalList type="home" />}
                    {last === 'community' && <CommunityList />}
                    {last === 'group' && <GroupList group_id={id} />}
                    <Outlet />
                </>
            </Main>

            <Right>
                <GroupTree />
            </Right>

        </Mobile>
    )

    return (
        <Tri left={l} right={r}>

            <Left>
                <MeMenu />
                <MessengerTree />
            </Left>

            <Main>
                <Nav>


                    <IconButton
                        onClick={() => setTri([!l, r])}
                        disableRipple={true}
                        size="small"
                        color="secondary"
                        sx={{
                            ':hover': { color: '#fff' },
                            height: '32px',
                            width: '32px',

                        }}>
                        <LibraryBooksRoundedIcon
                            fontSize='medium'
                        />
                    </IconButton>
                    <Search2 />
                    <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

                        <IconButton
                            onMouseDown={submit}
                            disableRipple={true}
                            size="small"
                            color="secondary"
                            sx={{
                                ':hover': { color: '#fff' },
                                height: '32px',
                                width: '32px',
                            }}>
                            <AddRoundedIcon
                                sx={{ fontSize: '34px' }}
                            />
                        </IconButton>


                        <StyledBadge
                            badgeContent={noti} invisible={!Boolean(noti)}>

                            <IconButton
                                onClick={notif}
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    height: '32px',
                                    width: '32px',

                                }}>
                                <NotificationsRoundedIcon sx={{ fontSize: '26px' }} />
                            </IconButton>
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
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </IconButton>

                    </div>


                </Nav>
                <>
                    {last === 'trending' && <GlobalList type="trending" />}
                    {last === 'home' && <GlobalList type="home" />}
                    {last === 'community' && <CommunityList />}
                    {last === 'group' && <GroupList group_id={id} />}
                    <Outlet />
                </>
            </Main>
            <Right>

                <GroupTree />

            </Right>
        </Tri >
    )
}

export default memo(Home)

