/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tri from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Outlet, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useState } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import LogoWithName from 'Stories/Bits/Branding/LogoWithName'
import { faFire, faScroll } from '@fortawesome/free-solid-svg-icons'
import { textNormal } from 'Global/Mixins'
import Search from 'Stories/Chunk/Search/Search'
import { Button, IconButton } from '@mui/material'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import VirtualTree from 'Stories/Chunk/VirtualTree/VirtualTree'
import { layoutSizeData } from 'State/Data'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import LoginSignup from 'Stories/Popups/LoginSignup'
import Leaf from 'Stories/Chunk/VirtualTree/Leaf'
import { textLabel } from 'Global/Mixins'

const Preview = () => {

    const navigate = useNavigate()
    const layoutSize = useRecoilValue(layoutSizeData)


    const [l, r] = useRecoilValue(triState)
    const setTri: any = useSetRecoilState(triState)
    const goAuth = () => navigate(`/auth`)


    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
            <LoginSignup open={showLogin} handleClose={() => setShowLogin(false)} />
            <Tri left={l} right={false}>

                <Left>
                    <LogoWithName />

                    <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Feeds</div >
                    <Leaf
                        icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faFire} />}
                        title='Trending'
                        link='/trending' />
                    <Leaf
                        icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faScroll} />}
                        title='Read Me'
                        link='/announcements' />


                    <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>
                        <div css={[textNormal('s'), {
                            padding: '4px 4px 22px 0',
                        }]}>
                            To participate in discussions and keep up with your preferred communities, set up an account and begin following them.                    </div>

                        <Button
                            onMouseDown={() => setShowLogin(true)}
                            sx={{
                                display: 'inline-flex',
                                whiteSpace: ' nowrap',
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

                        {layoutSize === 'mobile' ?
                            <IconButton
                                disableRipple
                                sx={{
                                    color: '#d7dadc', borderRadius: '12px !important',
                                    width: '24px',
                                }}
                                aria-haspopup="true"
                            >
                                <DragIndicatorRoundedIcon />
                            </IconButton> : <div />}

                        <Search />
                        <div css={{ display: 'flex' }}>

                            {layoutSize === 'desktop' && <Button
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
                                disabled
                                variant="contained" disableElevation>
                                <DeveloperBoardIcon /> Get App
                            </Button>}



                            <Button
                                onMouseDown={() => setShowLogin(true)}
                                sx={{
                                    display: 'inline-flex',
                                    whiteSpace: ' nowrap',
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
                                Join
                            </Button>


                        </div>

                    </Nav>
                    <Outlet />
                </Main>
                <></>
            </Tri >
        </>
    )
}

export default memo(Preview)

