/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { Outlet, useParams } from 'react-router-dom'
import usePersonList from '@/hooks/usePersonList'
import { mainSize } from '@/state/layout'
import { personFilter } from '@/state/filters'
import { overList } from '@/global/mixins'
import usePerson from '@/hooks/usePerson'
import GlobalFilter from '../bits/filter/GlobalFilter'
import PersonFilter from '../bits/filter/PersonFilter'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { HeadHolder, FilterHolder, PostHolder } from './PlaceHolders'



const PersonList = () => {

    const params = useParams()
    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(personFilter)

    const [isLoading1, isError1, components] = usePersonList(params.person_id, filter)
    const [isLoading, isError, component] = usePerson(params.person_id)


    return (<>
        <Outlet />
        <motion.div
            key={params.person_id}
            css={overList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >



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



            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>
    </>


    )
}


export default PersonList