/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { layoutSizeData, searchState } from 'State/Data';
import { useState, useEffect, memo, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Backdrop, ClickAwayListener, Popper, } from '@mui/material'
import { contentFlow } from 'State/Flow';
import useCommunityData from 'Hooks/Pull/useCommunityData';
import { useNavigate, useParams } from 'react-router-dom';
import { textLabel } from 'Global/Mixins';
import Avatar from 'Stories/Bits/Avatar/Avatar';
import { socketRequest } from 'Service/Socket';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const C = {
    container: css({
        width: '100%',
        height: "40px",
        borderRadius: '20px',
        padding: "2px 8px 3px 12px",
        background: '#0f0e10',
        zIndex: '500 !important',
        border: '2px solid #0f0e10',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        '&:focus': {
            border: '2px solid #0f0e10',
            color: "#fff !important",
        }
    }),
    input: css({
        all: 'unset',
        color: '#fff',
        width: '100%',
        height: '100%',
        fontSize: '13px',
        fontFamily: 'noto sans !important',
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }),
    tag: css({
        height: "30px",
        padding: "0 4px 0 10px",
        display: "flex",
        alignItems: "center",
        border: "2px solid #1F1E20",
        background: "#1F1E20",
        borderRadius: "16px",
        gap: "4px",
        outline: "0",
        color: "#D7DADC",
        cursor: "pointer",
        marginTop: "1px",


        '&:hover': {
            border: '2px solid #6e7071',
            color: "#fff !important",
        }
    }),
    tagTitle: css({
        color: 'inherit',
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "Noto Sans",
        lineHeight: "22px",
        maxWidth: "80px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }),
    prev: css({
        display: 'flex',
        width: '100%',
        height: '30px',
        padding: '0 8px',
        lineHeight: '30px',
        gap: '12px',
        fontSize: '14px',
        color: '#aaa2b2',
        cursor: 'pointer',
        marginBottom: '2px',
        marginTop: '2px',
        alignItems: 'center',
        borderRadius: '8px',
        '&:hover': {
            background: '#1f1e20',
            color: '#fff !important'
        }
    }),
}


const Search2 = () => {


    const [searches, setSearches] = useRecoilState(searchState)
    const [anchorEl, setAnchorEl]: any = useState(null);
    let layoutSize = useRecoilValue(layoutSizeData)

    const params: any = useParams()
    const [showTag, setShowTag] = useState(false)

    const navigate = useNavigate()

    const current = useCommunityData(params?.community_id)
    const content: any = useRecoilValue(contentFlow)

    const [query, setQuery] = useState('')


    const [persons, setPersons]: any = useState([])
    const [communitys, setCommunitys]: any = useState([])

    const removeTag = () => setShowTag(false)
    const handleX = (e: any) => {
        setQuery('')
        setShowTag(false)
        setAnchorEl(null)
        e.stopPropagation()
    }


    const openSearch = (e: any) => {
        if (anchorEl === null) setAnchorEl(e.currentTarget)
    }


    const handleSearch = (e: any) => {
        if (e.key === 'Backspace') {
            if (query.length === 0) setShowTag(false)
        }
        else if (e.key === 'Enter') {
            setSearches([query, ...searches.slice(0, 2)])

            setAnchorEl(null)
            if (showTag && current) navigate(`/c/${current?.community?.public_id}/search/${query}`)
            else navigate(`/search/${query}`)
        }
    }


    const handlePrevGo = (e: any) => {
        e.stopPropagation()
        navigate(`/search/${searches[e.currentTarget.dataset.test]}`)
        setQuery(searches[e.currentTarget.dataset.test])
        setAnchorEl(null)
    }
    const handlePrevDel = (e: any) => {
        e.stopPropagation()
        let temp = [...searches]
        temp.splice(e.currentTarget.dataset.test, 1)
        setSearches([...temp])
    }

    const handleClose = () => setAnchorEl(null)





    // TYPEAHEAD
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


    useEffect(() => {
        if (['community', 'searchCommunity', 'post', 'comment'].includes(content)) {
            setShowTag(true)
        }
        else setShowTag(false)
    }, [current, content])

    return (
        <>
            <Backdrop
                sx={{ zIndex: 500 }}
                open={Boolean(anchorEl)}
                onClick={handleClose}
            />

            <ClickAwayListener onClickAway={handleClose}>

                < div
                    onClick={openSearch}
                    css={C.container}
                    style={{
                        width: (layoutSize === 'mobile' && Boolean(anchorEl)) ? 'calc(100vw - 16px)' : '',
                        left:'0px',
                        position: (layoutSize === 'mobile' && Boolean(anchorEl)) ? 'absolute' : 'relative',
                        border: Boolean(anchorEl) ? '2px solid #996ccc' : '2px solid #0f0e10',
                    }
                    }>

                    <SearchRoundedIcon css={{ marginTop: '2px', marginRight: '0px', color: '#bcbdbe', fontSize: '24px' }} />

                    {
                        (showTag && current) && <div
                            onClick={removeTag}
                            css={C.tag}>
                            <Avatar public_id={current.community.public_id} size='tiny' />
                            <span
                                style={{ maxWidth: (layoutSize === 'mobile') ? '80px' : 'none', }}
                                css={C.tagTitle}>
                                {current?.community?.title}
                            </span>
                            <CloseRoundedIcon sx={{
                                position: "relative",
                                height: "22px",
                                color: 'inherit',
                                fontSize: "18px",
                            }} />
                        </div>
                    }


                    <input
                        autoComplete="off"
                        onKeyDown={handleSearch}
                        onChange={typeahead}
                        value={query}
                        id="SEARCH"
                        placeholder='Search Artram...'
                        css={C.input}
                    ></input>

                    {Boolean(anchorEl) &&
                        <div
                            onClick={handleX}
                            css={{
                                cursor: 'pointer',
                                height: '24px',
                                width: '24px',
                                color: '#bcbdbe',
                                marginBottom: '2px',
                            }}>
                            <CloseRoundedIcon sx={{ fontSize: '26px' }} />
                        </div>}

                    <Popper
                        onClick={(e) => { e.stopPropagation() }}
                        id='search-popper'
                        disablePortal
                        sx={{
                            border: '2px solid #996ccc',
                            position: 'relative',
                            borderRadius: '20px',
                            padding: '8px',
                            top: '16px !important',
                            width: 'calc(100% + 4px)',
                            height: 'auto',
                            background: '#0f0e10',
                            zIndex: '2000 !important',

                        }}
                        open={Boolean(anchorEl) && !showTag && (searches.length > 0 || communitys.length > 0 || persons.length > 0)}
                        anchorEl={anchorEl}>

                        <div>

                            {/* PREV SEARCHES */}
                            {searches.map((search: any, index: any) => <div css={C.prev} key={index} data-test={index} onClick={handlePrevGo}>
                                <SearchRoundedIcon sx={{ fontSize: '18px' }} />
                                {search}
                                <CloseRoundedIcon onClick={handlePrevDel} data-test={search} sx={{ fontSize: '20px', marginLeft: 'auto' }} />
                            </div>)}



                            {communitys.length > 0 && <div css={{ padding: '4px 12px 4px 12px' }}>
                                <div css={textLabel('t')}>Communities</div>
                                {communitys}
                            </div>}


                            {persons.length > 0 && <div css={{ padding: '0px 12px 0px 12px' }}>
                                <div css={textLabel('t')}>Users</div>
                                {persons}
                            </div>}



                        </div>
                    </Popper>



                </div >
            </ClickAwayListener >
        </>
    )
}




export default memo(Search2)


const debounce = (func: any) => {
    let timer: any;
    return function (...args: any) {
        //@ts-ignore
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 150);
    };
};
