/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import Person2Icon from '@mui/icons-material/Person2';
import { IconButton } from '@mui/material';
import LineWeightRoundedIcon from '@mui/icons-material/LineWeightRounded';
import SearchBar from 'Stories/Objects/SearchBar/SearchBar';
import { triState } from 'State/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Search from '../Search/Search';
import TagIcon from '@mui/icons-material/Tag';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { mBold, sBold } from 'Stories/Bits/Text/Text';
import Avatar from 'Stories/Bits/Avatar/Avatar';
import { contentFlow } from 'State/Flow';



const Nav = () => {


    const params = useParams()
    const navigate = useNavigate()

    const location = useLocation()

    let contentState = useRecoilValue(contentFlow)

    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)


    const handleR = () => setTri([l, !r])
    const handleL = () => setTri([!l, r])

    const s = css({
        width: '100%',
        borderTopLeftRadius: '0.4rem',
        borderTopRightRadius: '0.4rem',
        height: '50px',
        minHeight: '50px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9),0 0px 2px',
        display: 'flex',
        gap: '16px',
        paddingLeft: '12px',
        paddingRight: '12px',
        justifyContent: 'space-between',
        alignItems: 'center',
    })


    let preview = null

    console.log(contentState)


    if (Object.keys(params).length === 0) preview = (
        <div css={{
            display: 'flex',
            gap: '2px',
            padding: '0px 0px 0px 4px',
            alignItems: 'center',
            maxWidth: '150px',
            minWidth: '100px',
            textTransform: 'capitalize',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}>
            <TagIcon
                color="secondary"
                fontSize='medium'
            />
            <div css={mBold}>{location.pathname.substring(1)}</div>
        </div>
    )
    else if (
        params.community_id
    ) {
        preview = (
            <div css={{
                display: 'flex',
                gap: '8px',
                padding: '0px 0px 0px 8px',
                alignItems: 'center',
                maxWidth: '150px',
                minWidth: '100px',
                textTransform: 'capitalize',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>
                <Avatar public_id={params.community_id} size={'small'} />
                <div css={mBold}>{contentState?.community?.title ? contentState.community.title : 'loading'}</div>
            </div>
        )


    }



    return <div css={s} id="NAV">

        <div css={{ display: 'flex', whiteSpace: 'nowrap' }}>
            <IconButton aria-label="delete" size="medium" onClick={handleL}
                sx={{ borderRadius: 1, height: '32px', width: '32px' }}>
                <Person2Icon fontSize="inherit" />
            </IconButton>
            {preview}
        </div>


        <Search />


        <div
            css={{ whiteSpace: 'nowrap' }}
        >

            <IconButton
                disableRipple={true}
                size="small"
                color="secondary"
                sx={{
                    ':hover': { color: '#fff' },
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',

                    transform: 'rotate(90deg)',
                }}
            >
                <KeyRoundedIcon
                    fontSize='small'
                />
            </IconButton>

            <IconButton
                onMouseDown={() => navigate(`/submit`)}
                disableRipple={true}
                size="small"
                color="secondary"
                sx={{
                    ':hover': { color: '#fff' },
                    borderRadius: '4px',
                    height: '24px',
                    width: '24px',
                    margin: '0px 4px 0px 4px',
                }}>
                <AddBoxRoundedIcon
                    fontSize='medium'
                />
            </IconButton>

            <IconButton
                disableRipple={true}
                size="small"
                color="secondary"
                sx={{
                    ':hover': { color: '#fff' },
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                    margin: '0px 4px 0px 4px',

                }}>
                <NotificationsRoundedIcon
                    fontSize='medium'
                />
            </IconButton>



            <IconButton aria-label="delete" size="medium" onClick={handleR}
                sx={{ borderRadius: 1, height: '32px', width: '32px' }}>
                <LineWeightRoundedIcon fontSize="inherit" />
            </IconButton>
        </div>

    </div >
}

export default Nav

export interface Props {
    children?: any
    l: boolean,
    r: boolean,
    setTri: any,
}
