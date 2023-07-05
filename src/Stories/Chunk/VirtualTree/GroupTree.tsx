
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import { Input } from "@mui/material";
import { Tree } from "react-arborist";
import Leaf from "./Leaf";
import { memo, useState } from "react";
import useWindow from "Hooks/useWindow";
import { useRecoilState } from "recoil";
import { communityTreeData } from "State/Data";
import theme from "Global/Theme";
import Group from "./Group";
import EditGroup from "Stories/Popups/EditGroup";
import CommunityControls from "Stories/Bits/CommunityControls/CommunityControls";


const GroupTree = () => {

    const [tree, setTree] = useRecoilState(communityTreeData)
    const [filter, setFilter]: any = useState('active')
    const [search, setSearch] = useState('')
    const { width, height } = useWindow()

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
                    marginBottom: '8px',
                    height: '32px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    backgroundColor: theme.background.pri,
                    border: '2px solid',
                    borderColor: theme.background.pri,
                }}
            />

            <Tree
                data={tree}
                openByDefault={true}
                width={'100%'}
                height={height - 112}
                indent={24}
                rowHeight={40}
                
                overscanCount={1}
                searchTerm={filter}
                searchMatch={(node: any, term): any => {
                    if (search) {
                        return node.data.object.title.toLowerCase().includes(search.toLowerCase())
                    }
                    return true
                }}
            >
                {Node}
            </Tree >

            <CommunityControls />

        </>

    )





};



export default memo(GroupTree);