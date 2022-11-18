/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Input from 'Comps/Inputs/Input/Input'
import Tri from 'Comps/Views/Layout/Tri'
import Nav from 'Stories/Nav/Nav'
import Paper from 'Stories/Paper'
import CommunityTree from 'Stories/CommunityTree/CommunityTree'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { communityState, personState, roleState, triState } from 'State/atoms'
import CommunityControls from 'Stories/CommunityControls/CommunityControls'
import { Outlet } from 'react-router-dom'
import Person from 'Stories/Person/Person'
import { globalRoleData } from 'State/Data'

import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';


import HouseRoundedIcon from '@mui/icons-material/HouseRounded';

import NavButton from 'Stories/NavButton/NavButton'


const Home = () => {
    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)
    const person = useRecoilValue(personState)
    const roles = useRecoilValue(globalRoleData)
    const community = useRecoilValue(communityState)

    let c = {
        input: css({
            maxWidth: '400px',
            height: '36px !important'
        })
    }

    // console.log(person, roles)
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






            </Paper>

            <Paper background="tri" width="100%" height="100%" radius="m">
                <Nav l={l} r={r} setTri={setTri} />
                <Outlet />
            </Paper>

            <Paper background="sec" width="100%" height="100%" radius="m">
                <CommunityTree />
                <CommunityControls />
            </Paper>
        </Tri>
    )
}

export default Home

