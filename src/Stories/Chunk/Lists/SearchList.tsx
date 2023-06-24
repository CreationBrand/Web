/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FilterPane from 'Stories/Bits/Filter/CommunityFilter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import VirtualList from '../VirtualList/VirtualList';
import useSearch from 'Hooks/useSearch';
import SearchPane from 'Stories/Bits/Filter/SearchPane';

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const SearchList = () => {

    const params: any = useParams()
    const [filter, setFilter] = useState('post')

    const [isLoading, isError, components] = useSearch(filter, params.query)

    // console.log('SearchList', params.query, filter, isLoading, isError, components)
    
    return (
        <motion.div
            key={params.query}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <VirtualList list={[
                <SearchPane value={filter} onChange={setFilter} />, ...components
            ]} />
        </motion.div>
    )

}


export default SearchList


