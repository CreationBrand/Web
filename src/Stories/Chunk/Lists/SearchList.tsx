/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import VirtualList from '../VirtualList/VirtualList';
import useSearch from 'Hooks/useSearch';
import SearchPane from 'Stories/Bits/Filter/SearchPane';
import ChunkError from 'Stories/Bits/ChunkError/ChunkError';
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter';
import VirtuList from '../VirtualList/VirtuList';
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

const SearchList = () => {

    const params: any = useParams()
    const [filter, setFilter] = useState('post')
    const [isLoading, isError, components] = useSearch(filter, params.query)
    const mainSize = useRecoilValue(mainSizeState)

    return (
        <motion.div
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>

                {isError || isLoading ? <ChunkError variant={isError ? 'error' : 'loading'} /> :
                    <VirtuList
                        list={[
                            <SearchPane value={filter} onChange={setFilter} />,
                            ...components
                        ]}
                    />
                }
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>


    )

}


export default SearchList


