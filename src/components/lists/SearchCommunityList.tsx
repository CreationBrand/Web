/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { overList } from '@/global/mixins';
import { mainSize } from '@/state/layout';
import { useRecoilValue } from 'recoil';
import CommunitySearchFilter from '../bits/filter/CommunitySearchFilter';
import GlobalFilter from '../bits/filter/GlobalFilter';
import VirtuList from '../chunks/VirtualList/VirtuList';
import { FilterHolder, PostHolder } from './PlaceHolders';
import useCommunitySearch from '@/hooks/list/useCommunitySearch';
import useCommunity from '@/hooks/useCommunity';

const SearchCommunityList = () => {

    const params: any = useParams()
    const size = useRecoilValue(mainSize)

    const [isLoading, isError, components] = useCommunitySearch(params.community_id, params.query)
    const [isLoading1, isError1, component, data] = useCommunity(params.community_id)

    return (
        <motion.div
            key={params.query}
            css={overList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading) ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                component,
                                <CommunitySearchFilter />,
                                ...components
                            ]}
                />
            </div>

            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>
    )

}


export default SearchCommunityList



