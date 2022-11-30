/** @jsxImportSource @emotion/react */

import { useRecoilState } from 'recoil'
import { communityData } from 'State/Data'
import { css } from '@emotion/react'
import VirtualTree from 'Stories/Pure/VirtualTree/VirtualTree'
import { mMuted, smMuted } from 'Stories/Text/Text'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'

import NavButton from 'Stories/Objects/NavButton/NavButton'
import { Input } from '@mui/material'
import { useState } from 'react'
import theme from 'Global/Theme'

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
const C = {
    container: css({
        height: 'calc(100% - 50px)',
        width: '100%',
        padding: '8px',
    }),
}

const CommunityList = () => {
    const [value, setValue] = useState('')
    const [communitys, setter]: any = useRecoilState(communityData)

    const handleSearch = (e: any) => setValue(e.target.value)

    if (!communitys) return <div>communitys failed to fetch</div>

    const tree = listToTree(communitys)

    return (
        <div css={C.container}>
            <Input
                onChange={handleSearch}
                value={value}
                fullWidth
                disableUnderline
                placeholder="Search..."
                startAdornment={<ManageSearchRoundedIcon color="secondary" />}
                sx={{
                    height: '32px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    backgroundColor: theme.background.pri,
                    fontFamily: 'Ubuntu',
                    border: '2px solid',
                    borderColor: theme.background.pri,
                }}
            ></Input>

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

    if (node.data.type === 'group')
        return (
            <div onClick={handleOpenClose} css={C.group}>
                {!node.isOpen ? (
                    <KeyboardArrowUpRoundedIcon sx={{ height: '20px' }} color="secondary" />
                ) : (
                    <KeyboardArrowDownRoundedIcon sx={{ height: '20px' }} color="secondary" />
                )}

                <div css={mMuted}>{node.data.title}</div>
            </div>
        )
    return (
        <div css={C.container} ref={dragHandle}>
            {/* <CommunityElement props={node.data}></CommunityElement> */}
            <NavButton label={node.data.title} avatar_id={node.data.public_id} path={`c/${node.data.public_id}`} />
        </div>
    )
}

export default CommunityList

const listToTree = (list: any) => {
    let tree = []

    for (var i in list) {
        let children = []
        for (var j in list[i].items) {
            children.push({
                id: `${i}${j}`,
                type: 'community',
                ...list[i].items[j],
            })
        }

        tree.push({
            id: i,
            type: 'group',
            term: list[i].title,
            title: list[i].title,
            base: list[i].base,
            children: children,
        })
    }

    return tree
}
