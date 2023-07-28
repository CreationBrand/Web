/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState, useEffect, memo, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Backdrop, ClickAwayListener, Popper, } from '@mui/material'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { layoutSize } from '@/state/layout';
import { useParams, useNavigate } from 'react-router-dom';
import useCommunityData from '@/hooks/useCommunityData';
import { searchState } from '@/state/data';
import Avatar from '@/components/bits/Avatar';
import { contentFlow } from '@/state/flow';
import { socketRequest, socketRequestNoCache } from '@/hooks/util/useSocket';
import { label, treeLabel } from '@/global/mixins';
import { accent, bg_1, bg_4, bg_active, bg_hover, text_2 } from '@/global/var';

const C = {
    container: css({
        boxSizing: 'border-box',
        width: '100%',
        height: "40px",
        borderRadius: '20px',
        padding: "4px 8px 4px 8px",
        background: bg_1,
        zIndex: '500 !important',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',

        '&:focus': {
            // border: '2px solid #0f0e10',
            color: "#fff !important",
            // borderColor:
        }
    }),
    input: css({
        all: 'unset',
        color: '#fff',
        width: '100%',
        height: '100%',
        fontSize: '14px',
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }),
    tag: css({
        height: "30px",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        border: `2px solid ${bg_hover}`,
        background: bg_hover,
        borderRadius: "20px",
        gap: "4px",
        outline: "0",
        color: "#D7DADC",
        cursor: "pointer",


        '&:hover': {
            border: '2px solid #6e7071',
            color: "#fff !important",
        }
    }),
    tagTitle: css({
        color: 'inherit',
        fontSize: "13px",
        fontWeight: "600",
        lineHeight: "22px",
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
            background: bg_hover,
            color: '#fff !important'
        }
    }),
}


const Search2 = () => {


    const [searches, setSearches] = useRecoilState(searchState)
    const [anchorEl, setAnchorEl]: any = useState(null);
    let layout = useRecoilValue(layoutSize)

    const params: any = useParams()
    const [showTag, setShowTag] = useState(false)

    const navigate = useNavigate()

    const current: any = useCommunityData(params?.community_id)
    const content: any = useRecoilValue(contentFlow)

    const [query, setQuery] = useState('')


    const [persons, setPersons]: any = useState([])
    const [communitys, setCommunitys]: any = useState([])

    const handleTag = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`/c/${current?.community?.public_id}`)
    }
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
        let req: any = await socketRequestNoCache('typeAhead', { query: bouncedQuerry })
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
                            fontSize: '14px',
                        }}>{req.persons[i].nickname}</div>
                        <div css={{
                            color: '#d7dadc',
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
                            fontSize: '14px',
                        }}>{req.communities[i].title}</div>
                        <div css={{
                            color: '#d7dadc',
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

                <div
                    onClick={openSearch}
                    css={C.container}
                    style={{
                        height: (layout === 'mobile') ? 'calc(34px)' : '40px',
                        width: (layout === 'mobile' && Boolean(anchorEl)) ? 'calc(100vw - 8px)' : '',
                        left: (layout === 'mobile' && Boolean(anchorEl)) ? '4px' : '0px',
                        position: (layout === 'mobile' && Boolean(anchorEl)) ? 'absolute' : 'relative',
                        borderColor: Boolean(anchorEl) ? accent : bg_1,
                    }
                    }>

                    <SearchRoundedIcon css={{ color: '#bcbdbe', fontSize: '22px' }} />

                    {
                        (showTag && current) && <div
                            onClick={handleTag}
                            style={{
                                height: (layout === 'mobile') ? 'calc(30px)' : '34px',
                            }}
                            css={C.tag}>
                            <Avatar public_id={current.community.public_id} size='tiny' />
                            <span
                                style={{ maxWidth: (layout === 'mobile') ? '120px' : 'none', }}
                                css={C.tagTitle}>
                                {current?.community?.title}
                            </span>
                            <CloseRoundedIcon
                                onClick={removeTag}

                                sx={{
                                    width: '22px', height: '22px',
                                    position: "relative",
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
                            border: `2px solid ${accent}`,
                            position: 'relative',
                            borderRadius: '16px',
                            padding: '8px 12px',
                            top: '12px !important',
                            width: 'calc(100% + 4px)',
                            height: 'auto',
                            background: bg_1,
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



                            {communitys.length > 0 && <div>
                                <div css={{ fontSize: '13px', fontWeight: 'bold', color: text_2 }}>Communities</div>
                                {communitys}
                            </div>}


                            {persons.length > 0 && <>
                                <div css={{ fontSize: '13px', fontWeight: 'bold', color: text_2 }}>Users</div>
                                {persons}
                            </>}



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
