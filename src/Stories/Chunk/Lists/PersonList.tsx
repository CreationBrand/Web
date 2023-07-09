/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { Outlet, useParams } from 'react-router-dom'
import usePerson from 'Hooks/Pull/usePerson'
import PersonFilter from 'Stories/Bits/Filter/PersonFilter'
import { personFilter } from 'State/filterAtoms'
import usePersonList from 'Hooks/Pull/usePersonList'
import VirtuList from '../VirtualList/VirtuList'
import { mainSizeState } from 'State/Data'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import { FilterHolder, HeadHolder, PostHolder } from './PlaceHolders'

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

const PersonList = () => {

    const params = useParams()
    const mainSize = useRecoilValue(mainSizeState)
    const filter = useRecoilValue(personFilter)

    const [isLoading1, isError1, components] = usePersonList(params.person_id, filter)
    const [isLoading, isError, component] = usePerson(params.person_id)


    return (
        <motion.div
            key={params.person_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <Outlet />

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading || isError1 || isLoading1) ?
                            [<HeadHolder />, <FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                component,
                                <PersonFilter key={'filter'} />,
                                ...components]}
                />
            </div>



            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>


    )
}


export default PersonList