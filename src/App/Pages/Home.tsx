// /** @jsxImportSource @emotion/react */

// import { css } from '@emotion/react'
// import Tri from 'Stories/Views/Tri'
// import Nav from 'Stories/Chunk/Nav/Nav'
// import Paper from 'Stories/Misc/Paper'
// import { useRecoilValue, useSetRecoilState } from 'recoil'
// import { triState } from 'State/atoms'
// import CommunityControls from 'Stories/Objects/CommunityControls/CommunityControls'
// import { Outlet } from 'react-router-dom'
// import { communityData, globalRoleData, personData } from 'State/Data'

// import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';


// import HouseRoundedIcon from '@mui/icons-material/HouseRounded';

// import NavButton from 'Stories/Objects/NavButton/NavButton'
// import CommunityList from 'Stories/Loaders/CommunityList'
import Person from 'Stories/Objects/Person/Person'
// import MessengerList from 'Stories/Loaders/MessengerList'
// import ContentView from 'Stories/Views/Content/Content'
// import { memo } from 'react'


// const Home = () => {
//     const [l, r] = useRecoilValue(triState)
//     const setTri = useSetRecoilState(triState)


// const person = useRecoilValue(personData)
// const roles = useRecoilValue(globalRoleData)
// const community = useRecoilValue(communityData)

//     let c = {
//         input: css({
//             maxWidth: '400px',
//             height: '36px !important'
//         })
//     }


//     return (
//         <Tri left={l} right={r}>

//             <Paper background="sec" width="100%" height="100%" radius="m" padding={2} >
//                 {/* <Status {...person} /> */}
//                 <Person
//                     username={person.username}
//                     nickname={person.nickname}
//                     public_id={person.public_id}
//                     status={'active'}
//                 />
//                 <NavButton label="Home" icon={<HouseRoundedIcon />} path="home" />
//                 <NavButton label="Trending" icon={<WhatshotRoundedIcon />} path="trending" />
//                 <MessengerList />
//             </Paper>

//             <Paper background="tri" width="100%" height="100%" radius="m">
//                 <ContentView></ContentView>
//             </Paper>

//             <Paper background="sec" width="100%" height="100%" radius="m">

//                 <CommunityList />
//                 <CommunityControls />
//             </Paper>
//         </Tri>
//     )
// }

// export default memo(Home)



/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useNavigate } from 'react-router-dom'
import { communityData, globalRoleData, personData } from 'State/Data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { memo } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'

import { faFire, faHouse, faScroll } from '@fortawesome/free-solid-svg-icons'
import Search from 'Stories/Chunk/Search/Search'

import VirtualTree from 'Stories/Chunk/VirtualTree/VirtualTree'
import Right from 'Stories/Layout/Right'
import CommunityList from 'Stories/Loaders/CommunityList'
import CommunityControls from 'Stories/Objects/CommunityControls/CommunityControls'
import useMessengerTree from 'Hooks/useMessengerTree'
import { AnimatePresence } from 'framer-motion'
import { IconButton } from '@mui/material'



// ICONS
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LineWeightRoundedIcon from '@mui/icons-material/LineWeightRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import CommunityTree from 'Stories/Chunk/CommunityTree/CommunityTree'


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
                    <div></div>
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

