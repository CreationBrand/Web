/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { contentFlow, pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useLocation, useParams } from 'react-router-dom'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'
import VirtuList from '../VirtualList/VirtuList'
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
        justifyContent: 'center',
    })
}

const PersonList = () => {

    const params = useParams()

    const filter = useRecoilValue(postFilter)

    const [isLoading2, isError2, components] = usePersonList(params.person_id)
    const [isLoading, isError, component] = usePerson(params.person_id)
    // const [isLoading2, isError2, components] = usePullPosts('person', filter)

    useContentFlow('person')
    useCommunityFlow(null)


    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

    return (
        <motion.div
            key={params.person_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
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