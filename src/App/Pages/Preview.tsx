/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Tri, { Mobile } from 'Stories/Views/Tri'
import Nav from 'Stories/Layout/Nav'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { triState } from 'State/atoms'
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import Main from 'Stories/Layout/Main'
import Left from 'Stories/Layout/Left'
import LogoWithName from 'Stories/Bits/Branding/LogoWithName'
import { faAddressCard, faFire, faScroll } from '@fortawesome/free-solid-svg-icons'
import { textNormal } from 'Global/Mixins'
import { Button, IconButton } from '@mui/material'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { layoutSizeData } from 'State/Data'
import LoginSignup from 'Stories/Popups/LoginSignup'
import Leaf from 'Stories/Chunk/VirtualTree/Leaf'
import { textLabel } from 'Global/Mixins'
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import GroupList from 'Stories/Chunk/Lists/GroupList'
import Search2 from 'Stories/Chunk/Search/Search2'
import useWindow from 'Hooks/useWindow'

const Preview = () => {

    const layout = useRecoilValue(layoutSizeData)
    const [l, r] = useRecoilValue(triState)
    const setTri: any = useSetRecoilState(triState)
    const [last, setLast]: any = useState(false)
    const location = useLocation()

    useLayoutEffect(() => {
        let parts = location.pathname.split('/')
        if (location.pathname === '/trending') setLast('trending')
        else if (location.pathname === '/home') setLast('home')
        else if (parts[1] === 'c' && parts.length === 3) setLast('community')
        else if (parts[1] === 'g' && parts.length === 3) setLast('group')
    }, [location])

    if (layout === 'mobile') return (<Mobile>
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
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faAddressCard} />}
                title='Contact Us'
                link='/contact' />


            <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>
                <div css={[textNormal('s'), {
                    padding: '4px 4px 22px 0',
                }]}>
                    To participate in discussions and keep up with your preferred communities, set up an account and begin following them.                    </div>

                <Link to='auth' relative="path">
                    <Button
                        sx={{
                            display: 'inline-flex',
                            whiteSpace: ' nowrap',
                            borderRadius: '14px',
                            background: '#6858f2',
                            height: '40px',
                            width: '100%',
                            marginRight: '8px',
                            fontSize: '14px',
                            lineHeight: '12px !important',
                            fontWeight: '700',
                        }}
                        variant="contained" disableElevation>
                        Join Artram
                    </Button>
                </Link>
            </div>

        </Left>

        <Main>
            <Nav>
                <Search2 />
                <div css={{ display: 'flex' }}>

                    <Link to='auth' relative="path">
                        <Button
                            sx={{
                                borderRadius: '20px',
                                background: '#0f0e10',
                                height: '40px',
                                fontSize: '13px',
                                lineHeight: '12px !important',
                                fontWeight: '700',
                                gap: '4px',

                            }}

                            variant="contained" disableElevation>
                            <DeveloperBoardIcon /> Login
                        </Button>
                    </Link>

                </div>

            </Nav>
            <>
                {last === 'trending' && <GlobalList type="trending" />}
                {last === 'home' && <GlobalList type="home" />}
                {last === 'community' && <CommunityList />}
                {last === 'group' && <GroupList />}
                <Outlet />
            </>
        </Main>



    </Mobile>)

    return (<Tri left={l} right={false}>
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
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faAddressCard} />}
                title='Contact Us'
                link='/contact' />


            <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>
                <div css={[textNormal('s'), {
                    padding: '4px 4px 22px 0',
                }]}>
                    To participate in discussions and keep up with your preferred communities, set up an account and begin following them.                    </div>
                <Link to='auth' relative="path">
                    <Button
                        sx={{
                            display: 'inline-flex',
                            whiteSpace: ' nowrap',
                            borderRadius: '14px',
                            background: '#6858f2',
                            height: '40px',
                            width: '100%',
                            marginRight: '8px',
                            fontSize: '14px',
                            lineHeight: '12px !important',
                            fontWeight: '700',
                        }}
                        variant="contained" disableElevation>
                        Join Artram
                    </Button>
                </Link>
            </div>

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

                <Search2 />
                <div css={{ display: 'flex' }}>

                    <Link to='auth' relative="path">
                        <Button
                            sx={{
                                borderRadius: '20px',
                                background: '#0f0e10',
                                height: '40px',
                                fontSize: '13px',
                                lineHeight: '12px !important',
                                fontWeight: '700',
                                gap: '4px',

                            }}
                            variant="contained" disableElevation>
                            <DeveloperBoardIcon /> Login
                        </Button>
                    </Link>

                </div>

            </Nav>
            <>
                {last === 'trending' && <GlobalList type="trending" />}
                {last === 'home' && <GlobalList type="home" />}
                {last === 'community' && <CommunityList />}
                {last === 'group' && <GroupList />}
                <Outlet />
            </>
        </Main>

        <></>

    </Tri>

    )

}

export default memo(Preview)
