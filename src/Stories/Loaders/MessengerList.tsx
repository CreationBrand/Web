/** @jsxImportSource @emotion/react */

import { useRecoilState } from 'recoil'
import { communityData, messengerData } from 'State/Data'
import { css } from '@emotion/react'
import VirtualTree from 'Stories/Pure/VirtualTree/VirtualTree'
import { mMuted, smMuted } from 'Stories/Bits/Text/Text'

import { Button, ButtonGroup, Input } from '@mui/material'
import { useState } from 'react'
import theme from 'Global/Theme'

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import MessegerLi from 'Stories/Objects/MessengerLI/MessengerLi'
import MessengerFilter from 'Stories/Bits/MessengerFilter/MessengerFilter'
import { V } from '@use-gesture/core/dist/declarations/src/utils/maths'
const C = {
    container: css({
        height: 'calc(100% - 138px)',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }),
    footer: css({
        background: '#23232c',
        borderRadius: '8px',
        padding: '8px',
        marginTop: 'auto',
    }),
    label: css({
        paddingTop: '12px',
        paddingLeft: '12px',
    }),
}

const MessengerList = () => {
    const [value, setValue] = useState('active')
    const [communitys, setter]: any = useRecoilState(messengerData)

    const handleSearch = (e: any) => setValue(e.target.value)

    if (!communitys) return <div>Messengers failed to fetch</div>

    const tree = listToTree(communitys)

    return (
        <div css={C.container}>
            <div css={[mMuted, C.label]}>Messengers</div>
            <MessengerFilter value={value} onChange={(e: any) => setValue(e)} />
            <VirtualTree tree={tree} Node={Node} term={value}></VirtualTree>
        </div>
    )
}

const Node = ({ node, style, dragHandle, ...props }: any) => {
    const handleOpenClose = () => {
        node.toggle()
    }

    const C = {
        container: css({
            // border: "1px solid red",
            display: 'flex',
        }),
        depth: css({
            width: `${node.level * 20}px`,
        }),
        thread: css({
            borderRight: '2px solid #343536',
            display: 'block',
            width: '20px',
            height: '100%',
        }),
        icon: css({
            height: '40px',
            width: '40px',
            borderRadius: '8px',
            background: '#0e0e10',
            overflow: 'hidden',
        }),
        content: css({
            display: 'flex',
            padding: '8px 0px 0px 8px',
        }),
        group: css({
            height: '40px',
            padding: '20px 0px 0px 4px',
            display: 'flex',
            alignItems: 'center',
        }),
        community: css({}),
    }

    return (
        <div css={C.container} ref={dragHandle}>
            <MessegerLi props={node.data} />
        </div>
    )
}

export default MessengerList

const listToTree = (list: any) => {
    let tree = []

    for (var i in list) {
        tree.push({
            id: i,
            title: list[i].person.nickname,
            term: list[i].status,
            person: list[i].person,
            status: list[i].status,
            public_id: list[i].public_id,
        })
    }

    return tree
}
