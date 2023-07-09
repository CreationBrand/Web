/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useSearch from 'Hooks/useSearch';
import SearchPane from 'Stories/Bits/Filter/SearchPane';
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter';
import VirtuList from '../VirtualList/VirtuList';
import { useRecoilValue } from 'recoil';
import { mainSizeState } from 'State/Data';
import { FilterHolder, PostHolder } from './PlaceHolders';

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

const SearchList = () => {

    const params: any = useParams()
    const [filter, setFilter] = useState('community')
    const [isLoading, isError, components] = useSearch(filter, params.query)
    const mainSize = useRecoilValue(mainSizeState)

    return (
        <motion.div
            key={params.query}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Outlet />


            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                <SearchPane value={filter} onChange={setFilter} />,
                                ...components
                            ])}
                />
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>


    )

}


export default SearchList


