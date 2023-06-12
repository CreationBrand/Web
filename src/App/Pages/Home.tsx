
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useNavigate } from 'react-router-dom'
import { notificationStateFamily, personData } from 'State/Data'
import Person from 'Stories/Objects/Person/Person'
import { memo } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import Search from 'Stories/Chunk/Search/Search'
import VirtualTree from 'Stories/Chunk/VirtualTree/VirtualTree'
import Right from 'Stories/Layout/Right'
import useMessengerTree from 'Hooks/useMessengerTree'
import { AnimatePresence } from 'framer-motion'
import { Badge, BadgeProps, IconButton, styled } from '@mui/material'

// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import NavLabel from 'Stories/Bits/NavLabel/NavLabel'
import { transform } from 'typescript'
import LivePermissions from 'Stories/Alive/LivePermissions'
import MessengerTree from 'Stories/Chunk/VirtualTree/MessengerTree'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import CommunityTree from 'Stories/Chunk/VirtualTree/CommunityTree'


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 6,
        top: 10,
        lineHeight: '10px',
        // height: '18px',
        fontWeight: '600',
        // minHeight: '12px',
        fontSize: '10px',
        fontFamily: 'noto sans',
        border: `3px solid #272732`,
        padding: '0px 2px',
        color: '#fff',
        zIndex: 200,
        background: '#af4141',
    },
}));


const Home = () => {

    const navigate = useNavigate()

    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)
    const tree = useMessengerTree();
    const noti = useRecoilValue(notificationStateFamily('noti'))

    // DATA SUPPLY
    const person = useRecoilValue(personData)

    function handleR(event: any): void {

    }

    return (
        <Tri left={l} right={r}>

            <Left>
                <Person
                    username={person.username}
                    nickname={person.nickname}
                    public_id={person.public_id}
                    status={'active'}
                />
                <MessengerTree />
            </Left>

            <Main>
                <Nav>
                    <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

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

                    </div>
                    {/* <NavLabel /> */}
                    <Search />
                    <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

                        <IconButton
                            onMouseDown={() => navigate(`/submit`)}
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
                            onClick={() => navigate(`/notifications`)}
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
                <AnimatePresence>
                    <Outlet />
                </AnimatePresence>
            </Main>
            <Right>

                <CommunityTree />

            </Right>
        </Tri >
    )
}

export default memo(Home)

