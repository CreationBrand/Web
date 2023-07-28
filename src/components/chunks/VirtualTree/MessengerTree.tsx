
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { Tree } from "react-arborist";
import Leaf from "./Leaf";
import { memo, useState } from "react";
import { faFire, faHouseUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { messengerTree, person as personData } from "@/state/person";
import { treeLabel } from "@/global/mixins";
import useWindow from "@/hooks/util/useWindow";



const MessengerTree = () => {

    const tree = useRecoilValue(messengerTree)
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

            <div css={treeLabel}>Feeds</div>

            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faFire} />}
                title='Popular'
                link='/popular' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faHouseUser} />}
                title='Home'
                link='/home' />
            <Leaf
                icon={<FontAwesomeIcon css={{ fontSize: '18px', width: 20 }} icon={faUser} />}
                title='Me'
                link={`/me`} />


            {filter === 'active' ?
                <div css={treeLabel}>Direct Messages</div> :
                <div css={treeLabel}>Messages Requests</div>}



            <Tree
                className="tree"
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


            {/* <MessengerFilter value={search} onChange={handleSearch} filter={filter} filterChange={handleFilter} /> */}
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

export default memo(MessengerTree);