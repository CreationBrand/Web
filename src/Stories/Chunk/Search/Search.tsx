/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Autocomplete, ClickAwayListener, Input, Popover, Popper } from '@mui/material'
import { useCallback, useRef, useState } from 'react'
import { socketRequest } from 'Service/Socket'

import { Menu } from '@mui/material';
import { mBold, mMuted, sBold, sMuted, sNormal } from 'Stories/Bits/Text/Text';
import Avatar from 'Stories/Bits/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faYinYang } from '@fortawesome/free-solid-svg-icons';
import { textLabel, textLight } from 'Global/Mixins';
import { useNavigate } from 'react-router-dom';
import { boolean } from 'joi';

const s = css({
    width: '100%',
    height: '100%',
    maxWidth: '750px',
    position: 'relative',
})


const Search = () => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl]: any = useState(null);
    const [query, setQuery] = useState('')

    const [persons, setPersons]: any = useState([])
    const [communitys, setCommunitys]: any = useState([])


    const handleSearch = (e: any) => {
        if (e.key === 'Enter') {

            setAnchorEl(null)

            navigate(`/search/${query}`)

        }
    }


    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };


    let bounce = async (bouncedQuerry: any) => {
        if (bouncedQuerry.length < 5) return
        let req: any = await socketRequest('typeAhead', { query: bouncedQuerry })

        let tempPersons = []
        for (var i in req.persons) {

            tempPersons.push(
                <div
                    onClick={() => { console.log('click') }}
                    key={req.persons[i].public_id}
                    css={{
                        borderRadius: '8px',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '4px',
                        '&:hover': { background: '#1f1e20' }
                    }}
                >
                    <Avatar
                        size='small'
                        public_id={req.persons[i].public_id} />
                    <div>
                        <div css={{
                            color: '#f3f3f5',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                        }}>{req.persons[i].nickname}</div>
                        <div css={{
                            color: '#d7dadc',
                            fontFamily: 'Noto Sans',
                            fontSize: '12px',
                        }}>{req.persons[i].about_me} <FontAwesomeIcon icon={faYinYang} /> {req.persons[i].karma} karma</div>
                    </div>
                </div>)
        }

        let tempCommunitys = []
        for (var i in req.communities) {
            tempCommunitys.push(
                <div
                    onClick={(e) => {
                        handleClose()
                        //@ts-ignore
                        navigate(e.currentTarget.dataset.test)
                        e.stopPropagation()
                    }}

                    data-test={`c/${req.communities[i].public_id}`}
                    key={req.communities[i].public_id}
                    css={{
                        fontFamily: 'Noto Sans',
                        borderRadius: '8px',
                        gap: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '4px',
                        '&:hover': { background: '#1f1e20' }
                    }}
                >
                    <Avatar
                        size='small'
                        public_id={req.communities[i].public_id} />
                    <div>
                        <div css={{
                            color: '#f3f3f5',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                        }}>{req.communities[i].title}</div>
                        <div css={{
                            color: '#d7dadc',
                            fontFamily: 'Noto Sans',
                            fontSize: '12px',
                        }}>{req.communities[i].description} - {req.communities[i].subscribers} member</div>
                    </div>
                </div>)
        }

        setPersons(tempPersons)
        setCommunitys(tempCommunitys)

    }

    const optimizedFn = useCallback(debounce(bounce), []);

    const typeahead = async (e: any) => {
        await setQuery(e.target.value)
        optimizedFn(e.target.value)
    }



    return <div css={s} id="SEARCH">
        <Input
            startAdornment={<FontAwesomeIcon css={{ marginLeft: '8px', color: '#bcbdbe' }} icon={faMagnifyingGlass} />}
            onKeyPress={handleSearch}
            onClick={handleClick}
            value={query}
            onChange={typeahead}
            placeholder="Search Artram"
            fullWidth
            sx={{
                borderRadius: '14px',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                background: '#0f0e10',
                height: '40px',
                marginTop: '8px',
                color: '#d7dadc',
                zIndex: 110,
                border: Boolean(anchorEl) ? '2px solid #9147ff' : null,
            }}
            disableUnderline
        />
        <Popper
            onClick={(e: any) => e.stopPropagation()}
            id={'search-popper'}
            disablePortal
            sx={{

                border: '2px solid #343442',
                position: 'relative',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                top: '-12px !important',
                padding: '12px 12px 12px 12px',
                width: '100%', height: 'auto',
                background: '#0f0e10',
                zIndex: 100,
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}>

            <ClickAwayListener onClickAway={handleClose}>
                <div>

                    {communitys.length > 0 && <div css={{ marginTop: '8px' }}>
                        <div css={textLabel('t')}>Communities</div>
                        {communitys}
                    </div>}

                    {persons.length > 0 && <div css={{ marginTop: '8px' }}>
                        <div css={textLabel('t')}>Users</div>
                        {persons}
                    </div>}
                </div>
            </ClickAwayListener>
        </Popper>


    </div >
}

export default Search



const debounce = (func: any) => {
    let timer: any;
    return function (...args: any) {
        //@ts-ignore
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 500);
    };
};
