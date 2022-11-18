/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion, AnimateSharedLayout, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useEffect, useState } from 'react'
import theme from 'Global/Theme'
import { Label, Muted } from 'Comps/Base/Text/Text'
import { useRecoilState, useRecoilValue } from 'recoil'

import { communityData } from 'State/Data'
import { JSX } from '@emotion/react/jsx-runtime'
import LICommunity from 'Stories/LICommunity/LICommunity'
import { communityState } from 'State/atoms'
import { smMuted } from 'Stories/Text/Text'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'; import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 50px)',
        flexGrow: 1
    }),
    group: css({
        height: '40px',
        padding: '0px 0px 0px 10px',
        border: '1px solid green'
    })
}

const CommunityTree = () => {
    const [communitys, setter]: any = useRecoilState(communityState)
    if (!communitys) return <div>communitys failed to fetch</div>

    return (
        <div css={C.container} id='CommunityTree'>
            <LayoutGroup>
                <motion.ul>
                    {communitys.map((item: any) => (
                        <Group key={item.id} data={item} />
                    ))}
                </motion.ul>
            </LayoutGroup>
        </div>
    )
}

function Group(props: any) {

    const C = {
        container: css({
            display: 'flex',
            height: '40px',
            padding: '25px 0px 0px 4px',
            alignItems: 'center',
        })
    }
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => setIsOpen(!isOpen)
    let Items: any = []

    for (var i in props.data.items) {
        Items.push(<LICommunity props={props.data.items[i]}></LICommunity>)
    }

    return (
        <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
            <motion.div css={C.container} key={props.data.title} layout>

                {!isOpen ? <KeyboardArrowUpRoundedIcon sx={{ height: '20px' }}
                    color='secondary' /> : <KeyboardArrowDownRoundedIcon
                    sx={{ height: '20px' }}
                    color='secondary' />}


                <div css={smMuted}>{props.data.title} - {props.data.items.length}
                </div>

            </motion.div>
            {isOpen && Items}
        </motion.li>
    )
}

export default CommunityTree
