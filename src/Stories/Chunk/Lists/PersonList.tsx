/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, } from 'react'
import {  useRecoilValue } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import {  useParams } from 'react-router-dom'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import usePerson from 'Hooks/Pull/usePerson'
import PersonFilter from 'Stories/Bits/Filter/PersonFilter'
import { postFilter } from 'State/filterAtoms'
import usePersonList from 'Hooks/Pull/usePersonList'

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

const PersonList = () => {

    const params = useParams()

    const filter = useRecoilValue(postFilter)

    const [isLoading2, isError2, components] = usePersonList(params.person_id)
    const [isLoading, isError, component] = usePerson(params.person_id)
    // const [isLoading2, isError2, components] = usePullPosts('person', filter)

    useCommunityFlow(null)


    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

    return (
        <motion.div
            key={params.person_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <VirtualList
                list={[
                    component,
                    <PersonFilter key={'filter'} />,
                    ...components
                ]}
                public_id={params.person_id} />
        </motion.div>
    )
}


export default memo(PersonList)