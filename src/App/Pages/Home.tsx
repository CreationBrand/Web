
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useNavigate } from 'react-router-dom'
import { personData } from 'State/Data'
import Person from 'Stories/Objects/Person/Person'
import { memo } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import Search from 'Stories/Chunk/Search/Search'
import VirtualTree from 'Stories/Chunk/VirtualTree/VirtualTree'
import Right from 'Stories/Layout/Right'
import useMessengerTree from 'Hooks/useMessengerTree'
import { AnimatePresence } from 'framer-motion'
import { IconButton } from '@mui/material'

// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import CommunityTree from 'Stories/Chunk/CommunityTree/CommunityTree'
import NavLabel from 'Stories/Bits/NavLabel/NavLabel'
import { transform } from 'typescript'
import LivePermissions from 'Stories/Alive/LivePermissions'


const Home = () => {

    const navigate = useNavigate()

    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)
    const tree = useMessengerTree();


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
                <VirtualTree tree={tree} />
            </Left>

            <Main>
                <Nav>
                    <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <LivePermissions />
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

                        <IconButton
                            disableRipple={true}
                            size="small"
                            color="secondary"
                            sx={{
                                ':hover': { color: '#fff' },
                                height: '32px',
                                width: '32px',

                            }}>
                            <NotificationsRoundedIcon
                                sx={{
                                    fontSize: '26px'

                                }}
                            />
                        </IconButton>

                        <IconButton
                            onClick={() => setTri([true, !r])}
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

