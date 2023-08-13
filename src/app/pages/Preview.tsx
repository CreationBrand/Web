/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Left from '@/layouts/Left'
import Main from '@/layouts/Main'
import Nav from '@/layouts/Nav'

import { memo, useLayoutEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { desktopControl, layoutSize } from '@/state/layout'
import LogoWithName from '@/components/bits/LogoWithName'
import { Button, IconButton } from '@mui/material'
import Leaf from '@/components/chunks/VirtualTree/Leaf'
import Search2 from '@/components/chunks/Search/Search2'

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faFire, faPeopleGroup, faScroll } from '@fortawesome/free-solid-svg-icons'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

// import CommunityList from '@/components/lists/CommunityList'
import GlobalList from '@/components/lists/GlobalList'
import CommunityList from '@/components/lists/CommunityList'
import { bg_1, bg_2, bg_3 } from '@/global/var'
import { forumLabel } from '@/global/mixins'
import MainMobile from '@/layouts/MainMobile'
import NavMobile from '@/layouts/NavMobile'
import SearchM from '@/components/chunks/Search/searchM'
import Desktop from '@/layouts/Desktop'
import { Mobile } from '@/layouts/Mobile'
// import GroupList from '@/components/lists/GroupList'




const C = {
    theme: css({
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        cursor: 'pointer',
    }),
}

const Preview = () => {

    const layout = useRecoilValue(layoutSize)
    const [l, r] = useRecoilValue(desktopControl)
    const setTri: any = useSetRecoilState(desktopControl)

    const [last, setLast]: any = useState(false)
    const location = useLocation()

    useLayoutEffect(() => {
        let parts = location.pathname.split('/')
        if (location.pathname === '/popular') setLast('popular')
        else if (location.pathname === '/home') setLast('home')
        else if (parts[1] === 'c' && parts.length === 3) setLast('community')
        else if (parts[1] === 'g' && parts.length === 3) setLast('group')
    }, [location])

    if (layout === 'mobile') return (<Mobile>
        <Left>

            <LogoWithName />

            <div css={{ color: '#d7dadc', marginTop: '16px', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>FEEDS</div >

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faFire} />}
                title='Popular'
                link='/popular' />

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faPeopleGroup} />}
                title='Communitys'
                link='/communitys' />

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faScroll} />}
                title='Read Me'
                link='/announcements' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faAddressCard} />}
                title='Contact Us'
                link='/contact' />

            <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>

                <div css={{ padding: '4px 4px 22px 0', color: '#d7dadc' }}>
                    To participate in discussions and keep up with your preferred communities, set up an account and begin following them.
                </div>

                <Link to='auth' relative="path">
                    <Button
                        sx={{
                            display: 'inline-flex',
                            whiteSpace: ' nowrap',
                            borderRadius: '14px',
                            // background: '#6858f2',
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

        <MainMobile>
            <NavMobile>

                <SearchM />

                <Link to='auth' relative="path">
                    <Button
                        sx={{
                            borderRadius: '20px',
                            background: bg_2,
                            height: '34px',
                            fontSize: '10px',
                            fontWeight: '700',
                            gap: '4px',
                            padding: '0 12px',

                        }}
                        variant="contained" disableElevation>
                        <DeveloperBoardIcon /> Login
                    </Button>
                </Link>

            </NavMobile>
            {last === 'popular' && <GlobalList type="POPULAR" />}
            {last === 'community' && <CommunityList />}
            <Outlet />
        </MainMobile>

        <div />

    </Mobile>)

    return (<Desktop left={l} right={false}>
        <Left>
            <LogoWithName />

            <div css={{ color: '#d7dadc', marginTop: '16px', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>FEEDS</div >

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faFire} />}
                title='Popular'
                link='/popular' />

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faPeopleGroup} />}
                title='Communitys'
                link='/communitys' />

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faScroll} />}
                title='Read Me'
                link='/announcements' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faAddressCard} />}
                title='Contact Us'
                link='/contact' />


            <div css={{ color: '#d7dadc', marginTop: '16px', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px' }}>THEME</div >
            <div css={{ display: 'flex', gap: '12px', paddingLeft: '12px' }}>
                <div css={C.theme} style={{ background: '#0b1416', border: '2px solid #538a9c' }} onClick={() => { localStorage.setItem("theme", "reddit"); window.location.reload() }}></div>
                <div css={C.theme} style={{ background: '#272732', border: '2px solid #996ccc' }} onClick={() => { localStorage.setItem("theme", "dark"); window.location.reload() }}></div>
                <div css={C.theme} style={{ background: '#313338', border: '2px solid#7289da' }} onClick={() => { localStorage.setItem("theme", "discord"); window.location.reload() }}></div>
            </div>


            <div css={{ marginTop: 'auto', padding: '20px 4px 20px' }}>

                <div css={{ padding: '4px 4px 22px 0', color: '#d7dadc' }}>
                    To participate in discussions and keep up with your preferred communities, set up an account and begin following them.
                </div>

                <Link to='auth' relative="path" >
                    <Button
                        sx={{
                            display: 'inline-flex',
                            whiteSpace: ' nowrap',
                            borderRadius: '14px',
                            // background: '#6858f2',
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
                    <LibraryBooksRoundedIcon fontSize='medium' />
                </IconButton>

                <Search2 />

                <Link to='auth' relative="path">
                    <Button
                        sx={{
                            borderRadius: '20px',
                            background: bg_1,
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
            </Nav>
            <>
                {last === 'popular' && <GlobalList type="POPULAR" />}
                {last === 'community' && <CommunityList />}
                <Outlet />
            </>
        </Main>

        <></>

    </Desktop>)

}

export default memo(Preview)

