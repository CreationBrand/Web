/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState, useEffect, memo } from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

import { bg_1, bg_active, bg_nav, text_1, text_2, text_3, } from '@/global/var';
import { motion } from 'framer-motion';
import { contentFlow } from '@/state/flow';
import { useRecoilState, useRecoilValue } from 'recoil';
import useCommunityData from '@/hooks/useCommunityData';
import { set } from 'react-hook-form';
import { searchQuery, searchState } from '@/state/data';
import Avatar from '@/components/bits/Avatar';


const C = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        borderRadius: '20px',
        background: bg_active,
        width: '100%',
        padding: '8px',
        position: 'relative',
        gap: '6px',

    }),
    input: css({
        all: 'unset',
        color: text_3,
        width: '100%',
        height: '100%',
        fontSize: '13px',
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        '::placeholder': {
            color: text_2,
        },
    }),

}

const variants = {
    active: {
        height: '34px',
        borderRadius: '12px',
        background: bg_active,
        color: text_1,
    },
    start: {
        height: '34px',
        borderRadius: '20px',
        background: bg_nav,
        color: text_2,
    },
}





const SearchM = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useRecoilState(searchQuery)
    const [searches, setSearches] = useRecoilState(searchState)

    const [inCommunity, setInCommunity] = useState(false)

    const params: any = useParams()
    const current: any = useCommunityData(params?.community_id)
    const content: any = useRecoilValue(contentFlow)

    const handleSearch = (e: any) => {
        if (e.key === 'Backspace') {
            if (value.length === 0) setInCommunity(false)
        }
        else if (e.key === 'Enter') {

            setSearches([value, ...searches.slice(0, 2)])

            console.log(isFocused)

            if (inCommunity) navigate(`/c/${current?.community?.public_id}/search/${value}`)
            else navigate(`/search/${value}`)

        }
    }

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onSearch = (e: any) => {
        if (isFocused) return
        navigate('./typeahead', { relative: "path" })
    }

    const onClear = () => {
        // @ts-ignore
        navigate(-1, { relative: "path" })
    }

    useEffect(() => {

        if (params?.community_id) setInCommunity(true)
        else setInCommunity(false)

        let parts = location.pathname.split('/')

        if (parts[parts.length - 1] === 'typeahead') setIsFocused(true)
        else setIsFocused(false)
    }, [location])

    return (
        <motion.div
            animate={isFocused ? 'active' : 'start'}
            variants={variants}
            onClick={onSearch}
            css={C.container}
            style={{
                zIndex: isFocused ? 10000 : 'auto',
                position: isFocused ? 'absolute' : 'relative',
                width: isFocused ? 'calc(100vw - 16px)' : '100%',
            }}>

            {inCommunity ?
                <Avatar public_id={current?.community?.public_id} size='tiny' /> :
                <SearchRoundedIcon css={{ color: '#bcbdbe', fontSize: '22px' }} />
            }

            {inCommunity && <span css={{ fontSize: '13px', fontWeight: 500, color: text_3, whiteSpace: 'nowrap' }}>{current?.community?.title}...</span>}

            <input
                onKeyDown={handleSearch}
                value={value}
                onChange={onChange}
                autoComplete="off"
                id="SEARCH"
                placeholder={inCommunity ? '' : 'Search Artram...'}
                css={C.input} />

            {isFocused &&
                // @ts-ignore
                <CloseRoundedIcon
                    onClick={onClear}
                    sx={{
                        color: 'inherit',
                        width: '22px',
                        height: '22px',
                        position: "relative",
                        fontSize: "18px",
                    }} />
            }


        </motion.div>)
}




export default memo(SearchM)

