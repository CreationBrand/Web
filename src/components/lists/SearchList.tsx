/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


//@ts-ignore
import { Helmet } from "react-helmet"
import { overList } from '@/global/mixins';
import { useRecoilValue } from 'recoil';
import GlobalFilter from '../bits/filter/GlobalFilter';
import SearchPane from '../bits/filter/SearchPane';
import VirtuList from '../chunks/VirtualList/VirtuList';
import { FilterHolder, PostHolder } from './PlaceHolders';
import { layoutSize, mainSize } from '@/state/layout';
import useSearch from '@/hooks/list/useSearch';


const SearchList = () => {

    const params: any = useParams()
    const [filter, setFilter] = useState('community')
    const [isLoading, isError, components] = useSearch(filter, params.query)
    const size = useRecoilValue(mainSize)
    const layout = useRecoilValue(layoutSize)

    if (layout === 'mobile') return (
        <div css={overList}        >
            <motion.div
                css={{ width: '100%' }}
                key={`${params.query}${filter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.2 }}>

                <div css={{ maxWidth: '800px', width: '100%' }}>
                    <VirtuList
                        list={[
                            <SearchPane value={filter} onChange={setFilter} />,
                            ...components
                        ]}
                    />
                </div>

            </motion.div>
        </div >
    )

    return (
        <motion.div
            key={params.query}
            css={overList}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
        >

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

            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>


    )

}


export default SearchList


