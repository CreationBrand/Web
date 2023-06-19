/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import VirtualList from '../VirtualList/VirtualList';
import CommunitySearchFilter from 'Stories/Bits/Filter/CommunitySearchFilter';
import useCommunitySearch from 'Hooks/Pull/useCommunitySearch';
import useCommunityFlow from 'Hooks/useCommunityFlow';
import usePullCommunity from 'Hooks/usePullCommunity';
import ChunkError from 'Stories/Bits/ChunkError/MiniError';

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

const SearchCommunityList = () => {

    const params: any = useParams()

    useCommunityFlow(params.community_id)

    const [isLoading, isError, components] = useCommunitySearch(params.community_id, params.query)
    const [isLoading1, isError1, component, data] = usePullCommunity(params.community_id)


    if (isError1 || isError) return <ChunkError variant='error' />
    if (isLoading1 || isLoading) return <ChunkError variant='loading' />


    return (
        <motion.div
            key={params.query}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <VirtualList list={[
                component,
                <CommunitySearchFilter />,
                ...components
            ]} />
        </motion.div>
    )

}


export default SearchCommunityList


