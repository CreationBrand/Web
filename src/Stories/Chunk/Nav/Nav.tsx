/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import Person2Icon from '@mui/icons-material/Person2';
import { IconButton } from '@mui/material';
import LineWeightRoundedIcon from '@mui/icons-material/LineWeightRounded';
import SearchBar from 'Stories/Objects/SearchBar/SearchBar';
import { triState } from 'State/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Search from '../Search/Search';

const Nav = () => {
    const [l, r] = useRecoilValue(triState)
    const setTri = useSetRecoilState(triState)


    const handleR = () => setTri([l, !r])
    const handleL = () => setTri([!l, r])


    const s = css({
        width: '100%',
        borderTopLeftRadius: '0.4rem',
        borderTopRightRadius: '0.4rem',
        height: '50px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9),0 0px 2px',
        display: 'flex',
        paddingLeft: '12px',
        paddingRight: '12px',
        justifyContent: 'space-between',
        alignItems: 'center',

    })

    return <div css={s} id="NAV">

        <IconButton aria-label="delete" size="medium" onClick={handleL}
            sx={{ borderRadius: 1, height: '32px', width: '32px' }}>
            <Person2Icon fontSize="inherit" />
        </IconButton>

        <Search/>


        <IconButton aria-label="delete" size="medium" onClick={handleR}
            sx={{ borderRadius: 1, height: '32px', width: '32px' }}>
            <LineWeightRoundedIcon fontSize="inherit" />
        </IconButton>


    </div >
}

export default Nav

export interface Props {
    children?: any
    l: boolean,
    r: boolean,
    setTri: any,
}
