/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { ClickAwayListener, Input, Popper, } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { socketRequest } from 'Service/Socket'
import Avatar from 'Stories/Bits/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { textLabel } from 'Global/Mixins';
import { useNavigate } from 'react-router-dom';
import { layoutSizeData } from 'State/Data';
import { useRecoilValue } from 'recoil';
import { communityFlow, contentFlow } from 'State/Flow';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const s = css({
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 100,
    textOverflow: 'ellipsis',
})

const C = {
    tag: css({
        height: "26px",
        padding: "0 4px 0 10px",
        display: "flex",
        alignItems: "center",
        border: "2px solid #1F1E20",
        background: "#1F1E20",
        borderRadius: "10px",
        outline: "0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        color: "#D7DADC",
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "Noto Sans",
        lineHeight: "26px",
        cursor: "pointer",
        '&:hover': {
            border: '2px solid #6e7071',
            color: "#fff !important",
        }
    })
}


const Search = () => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl]: any = useState(null);
    const [query, setQuery] = useState('')

    const [persons, setPersons]: any = useState([])
    const [communitys, setCommunitys]: any = useState([])

    const [showTag, setShowTag] = useState(false)

    let layoutSize = useRecoilValue(layoutSizeData)
    const current = useRecoilValue(communityFlow)
    const content = useRecoilValue(contentFlow)

    const handleSearch = (e: any) => {
        if (e.key === 'Backspace') {
            if (query.length === 0) setShowTag(false)
        }
        else if (e.key === 'Enter') {
            setAnchorEl(null)
            if (showTag && current) navigate(`/c/${current?.public_id}/search/${query}`)
            else navigate(`/search/${query}`)
        }
    }

    const removeTag = () => setShowTag(false)
    const handleClick = (e: any) => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null)



    let bounce = async (bouncedQuerry: any) => {
        if (bouncedQuerry.length < 3) return
        let req: any = await socketRequest('typeAhead', { query: bouncedQuerry })

        let tempPersons = []
        for (var i in req.persons) {

            tempPersons.push(
                <div
                    onClick={(e) => {
                        setQuery('')
                        //@ts-ignore
                        navigate(e.currentTarget.dataset.test)
                        handleClose()
                    }}
                    key={req.persons[i].public_id}
                    data-test={`p/${req.persons[i].public_id}`}

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
                        }}>
                            <span css={{ fontWeight: 'bold' }}>
                                {req.persons[i].karma} </span>
                            karma</div>
                    </div>
                </div>)
        }

        let tempCommunitys = []
        for (var i in req.communities) {
            tempCommunitys.push(
                <div
                    onClick={(e) => {
                        setQuery('')
                        //@ts-ignore
                        navigate(e.currentTarget.dataset.test)

                        // e.stopPropagation()
                        handleClose()

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
                        }}>
                            <span css={{ fontWeight: 'bold' }}>{req.communities[i].subscribers}</span> members</div>
                    </div>
                </div>)
        }

        setPersons(tempPersons)
        setCommunitys(tempCommunitys)

    }
    const optimizedFn = useCallback(debounce(bounce), []);
    const typeahead = async (e: any) => {


        await setQuery(e.target.value)

        if (showTag) return
        optimizedFn(e.target.value)
    }

    const handleX = (e: any) => {
        setQuery('')
        setShowTag(false)
        setAnchorEl(null)
        e.stopPropagation()
    }


    useEffect(() => {
        if (content === 'community' || content === 'post' || content === 'comment') {
            setShowTag(true)
        }
        else setShowTag(false)
    }, [current, content])

    return <div css={s} id="SEARCH"

        style={{
            width: (layoutSize === 'mobile' && Boolean(anchorEl)) ? 'calc(100vw - 38px)' : '',
            position: (layoutSize === 'mobile' && Boolean(anchorEl)) ? 'absolute' : 'relative',
        }}>
        <Input
            autoComplete='off'
            type="search"
            id='search'
            endAdornment={Boolean(anchorEl) &&
                <div
                    onClick={handleX}
                    css={{
                        padding: '0 8px', marginTop: '4px', cursor: 'pointer',
                        color: '#bcbdbe',
                    }}>
                    <CloseRoundedIcon />
                </div>
            }
            startAdornment={
                <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FontAwesomeIcon css={{ marginLeft: '14px', color: '#bcbdbe', fontSize: '16px' }} icon={faMagnifyingGlass} />
                    {(showTag && current) && <div
                        onClick={removeTag}
                        css={C.tag}>{current?.title}

                        <CloseRoundedIcon sx={{
                            position: "relative",
                            height: "26px",
                            marginLeft: "2px",
                            color: 'inherit',
                            fontSize: "18px",
                        }} />
                    </div>}
                </div>

            }
            // onBlur={handleClose}
            onKeyDown={handleSearch}
            onClick={handleClick}
            value={query}
            onChange={typeahead}
            placeholder="Search Artram"
            fullWidth
            sx={{
                borderRadius: '20px',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                background: '#0f0e10',
                height: '40px',
                marginTop: '8px',
                color: '#d7dadc',
                zIndex: 2000,

                '$:focus': {
                    background: '#0f0e10',
                },

                // border: Boolean(anchorEl) ? '2px solid #9147ff' : null,
            }}
            disableUnderline
        />





        <Popper


            id={'search-popper'}
            disablePortal
            sx={{

                border: '2px solid #343442',
                position: 'relative',
                borderRadius: '8px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                top: '-12px !important',
                width: '100%', height: 'auto',
                background: '#0f0e10',
                zIndex: 1500,

            }}
            open={Boolean(anchorEl) && !showTag}
            anchorEl={anchorEl}>

            <ClickAwayListener onClickAway={handleClose}>
                <div>

                    {communitys.length > 0 && <div css={{
                        marginTop: '8px',
                        padding: '12px 12px 12px 12px',
                    }}>
                        <div css={textLabel('t')}>Communities</div>
                        {communitys}
                    </div>}

                    {persons.length > 0 && <div css={{

                        padding: '0px 12px 12px 12px',
                    }}>
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
        }, 200);
    };
};
