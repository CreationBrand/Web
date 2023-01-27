/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Chunk/Nav/Nav'
import Paper from 'Stories/Misc/Paper'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import CommunityControls from 'Stories/Objects/CommunityControls/CommunityControls'
import { Outlet } from 'react-router-dom'
import { communityData, globalRoleData, personData } from 'State/Data'

import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';


import HouseRoundedIcon from '@mui/icons-material/HouseRounded';

import NavButton from 'Stories/Objects/NavButton/NavButton'
import CommunityList from 'Stories/Loaders/CommunityList'
import Person from 'Stories/Objects/Person/Person'
import MessengerList from 'Stories/Loaders/MessengerList'
import ContentView from 'Stories/Views/Content/Content'
import { memo } from 'react'


const Home = () => {
    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)


    const person = useRecoilValue(personData)
    const roles = useRecoilValue(globalRoleData)
    const community = useRecoilValue(communityData)

    let c = {
        input: css({
            maxWidth: '400px',
            height: '36px !important'
        })
    }

    
    return (
        <Tri left={l} right={r}>

            <Paper background="sec" width="100%" height="100%" radius="m" padding={2} >
                {/* <Status {...person} /> */}
                <Person
                    username={person.username}
                    nickname={person.nickname}
                    public_id={person.public_id}
                    status={'active'}
                />
                <NavButton label="Home" icon={<HouseRoundedIcon />} path="home" />
                <NavButton label="Trending" icon={<WhatshotRoundedIcon />} path="trending" />
                <MessengerList />
            </Paper>

            <Paper background="tri" width="100%" height="100%" radius="m">
                <ContentView></ContentView>
            </Paper>

            <Paper background="sec" width="100%" height="100%" radius="m">

                <CommunityList />
                <CommunityControls />
            </Paper>
        </Tri>
    )
}

export default memo(Home)

