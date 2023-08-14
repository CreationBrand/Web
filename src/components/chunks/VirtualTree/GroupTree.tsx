
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import { Input } from "@mui/material";
import { Tree } from "react-arborist";
import Leaf from "./Leaf";
import { memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityTree } from "@/state/person";
import Group from "./Group";
import EditGroup from "@/components/popups/EditGroup";
import { bg_1 } from "@/global/var";
import CommunityControls from "@/components/bits/CommunityControls";
import { layoutSize } from "@/state/layout";
import useWindow from "@/hooks/util/useWindow";

const GroupTree = () => {

    const [tree, setTree] = useRecoilState(communityTree)
    const [search, setSearch] = useState('')
    const { width, height } = useWindow()
    const layout = useRecoilValue(layoutSize)
    const [edit, setEdit] = useState(null)

    const editOpen = (e: any) => setEdit(e.data.object)
    const editClose = () => setEdit(null)
    const handleSearch = (e: any) => setSearch(e.target.value)

    const Node = ({ node, style, dragHandle }: any) => {

        if (node.data.type === 'group') return (<Group node={node} onEdit={editOpen} />)

        else if (node.data.type === 'leaf') return <Leaf
            atom={`group:${node.id}`}
            public_id={node.id}
            icon={node.data.object.icon}
            title={node.data.object.title}
            link={node.data.link} />

        else return <div></div>
    }

    return (
        <>
            <EditGroup group={edit} handleClose={editClose} />

            <Input
                className="TREE"
                onChange={handleSearch}
                value={search}
                fullWidth
                disableUnderline
                placeholder="Search..."
                startAdornment={<ManageSearchRoundedIcon color="secondary" />}
                sx={{
                    input: { paddingLeft: '4px' },
                    paddingLeft: '4px',
                    marginBottom: '2px',
                    height: '32px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '2px solid',
                    background: bg_1,
                    borderColor: bg_1,
                    fontFamily: 'system-ui',
                }}
            />

            <Tree
                className="tree"
                data={tree}
                openByDefault={false}
                width={'100%'}
                height={layout === 'desktop' ? height - 108 : height - 108}
                indent={24}
                rowHeight={40}
                overscanCount={1}
                searchTerm={search}
                searchMatch={(node: any, term): any => {
                    return node.data.object.title.toLowerCase().includes(term.toLowerCase())
                }}
            >
                {Node}
            </Tree >

            <CommunityControls />

        </>

    )





};



export default memo(GroupTree);