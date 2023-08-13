/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import FullPop from "@/layouts/FullPop"
import { layoutSize } from "@/state/layout"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { useNavigate, useParams } from 'react-router-dom'
import { searchQuery, searchState } from '@/state/data'

import { contentFlow } from '@/state/flow'
import { bg_2, bg_active, bg_hover, text_1, text_2 } from '@/global/var'
import useCommunityData from '@/hooks/useCommunityData'
import Avatar from '@/components/bits/Avatar'


import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const C = {
    item: css({
        width: '100%',
        borderRadius: '12px',
        background: bg_active,
        color: text_1,
        display: 'flex',
        padding: '8px',
        gap: '6px'
    }),
    prev: css({
        display: 'flex',
        width: '100%',
        height: '32px',
        padding: '0px 12px',
        lineHeight: '30px',
        gap: '8px',
        fontSize: '14px',
        color: '#aaa2b2',
        cursor: 'pointer',
        alignItems: 'center',
        background: bg_active
    }),
}

const Typeahead = () => {

    const navigate = useNavigate()
    const params = useParams()
    const layout = useRecoilValue(layoutSize)
    const [here, setHere] = useState<any>(null)
    const [value, setValue] = useRecoilState(searchQuery)


    const content: any = useRecoilValue(contentFlow)
    const current: any = useCommunityData(params?.community_id)
    const [searches, setSearches] = useRecoilState(searchState)

    useEffect(() => {
        if (content === 'community') {
            setHere(
                <div css={C.item}>
                    <Avatar size='tiny' src={current?.community?.public_id} />
                    <div>{current?.community?.title}</div>
                </div>)
        }
    }, [])

    const handlePrevGo = (e: any) => {
        e.stopPropagation()
        navigate(`/search/${searches[e.currentTarget.dataset.test]}`)
    }

    const handlePrevDel = (e: any) => {
        e.stopPropagation()
        let temp = [...searches]
        temp.splice(e.currentTarget.dataset.test, 1)
        setSearches([...temp])
    }




    if (layout === 'mobile') return (
        <FullPop>
            <div css={{ marginTop: '40px' }} />

            {searches.length > 0 && <>
                <div css={{ overflow: 'hidden', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {searches.map((search: any, index: any) => <div css={C.prev} key={index} data-test={index} onClick={handlePrevGo}>
                        <SearchRoundedIcon sx={{ fontSize: '18px' }} />
                        {search}
                        <CloseRoundedIcon onClick={handlePrevDel} data-test={search} sx={{ fontSize: '20px', marginLeft: 'auto' }} />
                    </div>)}
                </div>
            </>}



        </FullPop>)
    else return <></>
}



export default Typeahead