/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import theme from 'Global/theme'
import { Label, Muted } from 'Comps/Base/Text/Text'
import { useRecoilState, useRecoilValue } from 'recoil'

import { communityData } from 'State/Data'
import { JSX } from '@emotion/react/jsx-runtime'
import LICommunity from 'Stories/LICommunity/LICommunity'

const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid blue',
        flexGrow: 1
    }),
    group: css({
        height: '40px',
        padding: '0px 0px 0px 10px',
        border: '1px solid green'
    })
}

const CommunityTree = () => {
    const [communitys, setter] = useRecoilState(communityData)

    if (!communitys) return <div>communitys failed to fetch</div>

    return (
        <div css={C.container}>
            <AnimateSharedLayout>
                <motion.ul layout initial={{ borderRadius: 25 }}>
                    {communitys.map((item) => (
                        <Group key={item} data={item} />
                    ))}
                </motion.ul>
            </AnimateSharedLayout>
        </div>
    )
}

function Group(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => setIsOpen(!isOpen)

    let Items: any = []
    for (var i in props.data.jsonb_agg) {
        Items.push(<LICommunity props={props.data.jsonb_agg[i]}></LICommunity>)
    }

    return (
        <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
            <motion.div css={C.group} layout>
                <div css={Label}>{props.data.title}</div>
            </motion.div>
            <AnimatePresence>{isOpen && Items}</AnimatePresence>
        </motion.li>
    )
}

// function LICommunity(props: any) {
//     const c = css({
        // height: '40px',
        // border: '1px solid white',
        // margin: '10px',
        // borderRadius: '4px',

        // '&:hover': {
        //     background: theme.background.tri
        // }
//     })

//     console.log(props.data)
//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//         >
//             <div css={c}>asdf</div>
//         </motion.div>
//     )
// }

export default CommunityTree
