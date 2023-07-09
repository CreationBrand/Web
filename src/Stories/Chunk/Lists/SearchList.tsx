/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSearch from 'Hooks/useSearch';
import SearchPane from 'Stories/Bits/Filter/SearchPane';
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter';
import VirtuList from '../VirtualList/VirtuList';
import { useRecoilValue } from 'recoil';
import { mainSizeState } from 'State/Data';
import { FilterHolder, PostHolder } from './PlaceHolders';
import { overList } from 'Global/Mixins';

//@ts-ignore
import { Helmet } from "react-helmet"


const SearchList = () => {

    const params: any = useParams()
    const [filter, setFilter] = useState('community')
    const [isLoading, isError, components] = useSearch(filter, params.query)
    const mainSize = useRecoilValue(mainSizeState)

    return (
        <motion.div
            key={params.query}
            css={overList}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <Helmet>
                <title>Artram: Search - {params?.query}</title>
            </Helmet>


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


