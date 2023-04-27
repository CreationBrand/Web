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
import LogoWithName from 'Stories/Bits/Branding/LogoWithName'
import NavButton from 'Stories/Objects/NavButton/NavButton'
import { faFire, faHouse, faQuestion, faScroll } from '@fortawesome/free-solid-svg-icons'
import { textBold, textLight, textNormal } from 'Global/Mixins'
import Search from 'Stories/Chunk/Search/Search'
import { Button } from '@mui/material'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import VirtualTree from 'Stories/Chunk/VirtualTree/VirtualTree'

const Preview = () => {

    const navigate = useNavigate()

    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)


    const person = useRecoilValue(personData)
    const roles = useRecoilValue(globalRoleData)
    const community = useRecoilValue(communityData)


    const goAuth = () => navigate(`/auth`)


    return (
        <Tri left={l} right={false}>

            <Left>
                <LogoWithName />
                <VirtualTree
                    tree={[
                        {
                            id: "0",
                            isBranch: true,
                            name: "FEEDS",
                            children: [
                                {
                                    id: "trending", name: "Trending",
                                    icon: <FontAwesomeIcon size='1x' icon={faFire} />
                                },
                                {
                                    id: "home", name: "Home",
                                    icon: <FontAwesomeIcon size='1x' icon={faHouse} />
                                },
                            ],
                        }, {
                            id: "1",
                            isBranch: true,
                            name: "RESOURCES",
                            children: [
                                {
                                    id: "updates", name: "Updates",
                                    icon: <FontAwesomeIcon size='1x' icon={faScroll} />
                                },
                                {
                                    id: "about", name: "About Artram",
                                    icon: <FontAwesomeIcon size='1x' icon={faHouse} />
                                }, {
                                    id: "help", name: "Help",
                                    icon: <FontAwesomeIcon icon={faQuestion} />
                                },

                            ],
                        }
                    ]}

                ></VirtualTree>

                <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>
                    <div css={[textNormal('s'), {
                        padding: '4px 4px 22px 0',
                    }]}>
                        To participate in discussions and keep up with your preferred communities, set up an account and begin following them.                    </div>

                    <Button
                        onMouseDown={goAuth}
                        sx={{
                            display: 'inline-flex',
                            wordWrap: 'nowrap !important',
                            borderRadius: '14px',
                            background: '#6858f2',
                            height: '40px',
                            width: '100%',
                            marginRight: '8px',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            lineHeight: '12px !important',
                            fontWeight: '700',
                        }}
                        variant="contained" disableElevation>
                        Join Artram
                    </Button>

                </div>

            </Left>
            <Main>
                <Nav>
                    <div></div>
                    <Search />
                    <div css={{ display: 'flex' }}>
                        <Button
                            sx={{
                                borderRadius: '14px',
                                background: '#0f0e10',
                                height: '40px',
                                marginRight: '8px',
                                fontFamily: 'Noto Sans',
                                fontSize: '12px',
                                lineHeight: '12px !important',
                                fontWeight: '700',
                                gap: '4px',
                            }}
                            variant="contained" disableElevation>
                            <DeveloperBoardIcon /> Get App
                        </Button><Button
                            onMouseDown={goAuth}

                            sx={{
                                display: 'inline-flex',
                                wordWrap: 'nowrap !important',
                                borderRadius: '14px',
                                background: '#6858f2',
                                height: '40px',
                                marginRight: '8px',
                                fontFamily: 'Noto Sans',
                                fontSize: '12px',
                                lineHeight: '12px !important',
                                fontWeight: '700',
                            }}
                            variant="contained" disableElevation>
                            Log In
                        </Button>


                    </div>

                </Nav>
                <Outlet />
            </Main>
        </Tri >
    )
}

export default memo(Preview)
