
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { textLabel, } from "Global/Mixins";
import { Tree } from "react-arborist";
import Leaf from "./Leaf";
import MessengerFilter from "Stories/Bits/MessengerFilter/MessengerFilter";
import { useState } from "react";
import { faFire, faHouseUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindow from "Hooks/useWindow";
import { useRecoilValue } from "recoil";
import { messengerTreeData, personData } from "State/Data";



const MessengerTree = () => {

    const tree = useRecoilValue(messengerTreeData)
    const person = useRecoilValue(personData)
    const [filter, setFilter]: any = useState('active')
    const [search, setSearch] = useState('')
    const { width, height } = useWindow()

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
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faFire} />}
                title='Trending'
                link='/trending' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faHouseUser} />}
                title='Home'
                link='/home' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faUser} />}
                title='Me'
                link={`/p/${person.public_id}`} />


            {filter === 'active' ?
                <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Direct Messages</div> :
                <div css={[textLabel('t'), { color: '#d7dadc', marginTop: '16px' }]}>Messages Requests</div>}



            <Tree
                className="TREE"
                initialData={tree}
                openByDefault={false}
                width={216}
                height={height - 330}
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
        atom={`messenger:${node.id}`}
        public_id={node.id}
        icon={node.data.object.icon}
        title={node.data.object.title}
        link={node.data.link} />
}

export default MessengerTree;