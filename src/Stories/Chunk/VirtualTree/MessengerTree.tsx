
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"


import { Avatar } from "@mui/material";
import { textBold, textLabel, textNormal } from "Global/Mixins";
import useMessengerTree from "Hooks/useMessengerTree";
import { motion } from "framer-motion";
import { Tree } from "react-arborist";
import { useLocation } from "react-router-dom";
import Leaf from "./Leaf";
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter";
import { useState } from "react";
import { faFire, faHouse, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindow from "Hooks/useWindow";
import MessengerControl from "Stories/Bits/MessengerFilter/MessengerControl";



const MessengerTree = () => {

    const tree = useMessengerTree();
    const [filter, setFilter]: any = useState('active')
    const [search, setSearch] = useState('')
    const { width, height } = useWindow()


    console.log(tree)

    const handleFilter = (e: any) => {
        setFilter(e)
    }
    const handleSearch = (e: any) => {
        setSearch(e.target.value)
    }

    return (
        <>

            <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Feeds</div >

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faFire} />}
                title='Trending'
                link='/trending' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px' }} icon={faHouseUser} />}
                title='Home'
                link='/home' />



            {filter === 'active' ?
                <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Direct Messages</div> :
                <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Messages Requests</div>}



            <Tree
                initialData={tree}
                openByDefault={false}
                width={216}
                height={height - 290}
                indent={24}
                rowHeight={40}
                overscanCount={1}
                searchTerm={filter}
                searchMatch={(node: any, term): any => {
                    if (search) {
                        return node.data.object.title.toLowerCase().includes(search.toLowerCase())
                    }
                    return node?.data?.filter === term
                }}
            >
                {Node}
            </Tree >


            <MessengerFilter value={search} onChange={handleSearch} filter={filter} filterChange={handleFilter} />
        </>

    )
};


const Node = ({ node, style, dragHandle }: any) => {

    return <Leaf
        public_id={node.id}
        icon={node.data.object.icon}
        title={node.data.object.title}
        link={node.data.link} />
}

export default MessengerTree;