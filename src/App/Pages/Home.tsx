/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import MessengerTree from 'Stories/Chunk/VirtualTree/MessengerTree'
import GroupTree from 'Stories/Chunk/VirtualTree/GroupTree'
import MeMenu from 'Stories/Menu/MeMenu'
import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { layoutSizeData, notificationStateFamily } from 'State/Data'
import { memo, useEffect, useState } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import Search from 'Stories/Chunk/Search/Search'
import Right from 'Stories/Layout/Right'
import { Badge, BadgeProps, IconButton, styled } from '@mui/material'

// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import { AnimatePresence } from 'framer-motion'
import GroupList from 'Stories/Chunk/Lists/GroupList'


const StyledBadge = styled(Badge)<BadgeProps>({
    '& .MuiBadge-badge': {
        right: 6,
        top: 10,
        lineHeight: '10px',
        fontWeight: '600',
        fontSize: '10px',
        fontFamily: 'noto sans',
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
    const layoutSize = useRecoilValue(layoutSizeData)

    const submit = () => navigate(`/submit`)
    const notif = () => navigate(`/notifications`)

    const [last, setLast]: any = useState(false)
    const [id, setId]: any = useState(false)

    const location = useLocation()

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


    return (
        <Tri left={l} right={r}>

            <Left>
                <MeMenu />

                <MessengerTree />
            </Left>

            <Main>
                <Nav>
                    {layoutSize === 'mobile' ? <>
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

                        <Search />
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
                    </>
                        :
                        <>
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
                            <Search />
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
                        </>
                    }
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

