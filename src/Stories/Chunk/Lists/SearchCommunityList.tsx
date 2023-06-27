/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import CommunitySearchFilter from 'Stories/Bits/Filter/CommunitySearchFilter';
import useCommunitySearch from 'Hooks/Pull/useCommunitySearch';
import usePullCommunity from 'Hooks/usePullCommunity';
import VirtuList from '../VirtualList/VirtuList';
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter';
import { FilterHolder, PostHolder } from './PlaceHolders';
import { useRecoilValue } from 'recoil';
import { mainSizeState } from 'State/Data';

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const SearchCommunityList = () => {

    const params: any = useParams()
    const mainSize = useRecoilValue(mainSizeState)


    const [isLoading, isError, components] = useCommunitySearch(params.community_id, params.query)
    const [isLoading1, isError1, component, data] = usePullCommunity(params.community_id)


    return (
        <motion.div
            key={params.query}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >


            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading || isError1 || isLoading1) ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                component,
                                <CommunitySearchFilter />,
                                ...components
                            ]}
                />
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>
    )

}


export default SearchCommunityList


