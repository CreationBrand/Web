/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { Outlet, useParams } from 'react-router-dom'
import usePersonList from '@/hooks/usePersonList'
import { layoutSize, mainSize } from '@/state/layout'
import { personFilter } from '@/state/filters'
import { overList } from '@/global/mixins'
import usePerson from '@/hooks/usePerson'
import GlobalFilter from '../bits/filter/GlobalFilter'
import PersonFilter from '../bits/filter/PersonFilter'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { HeadHolder, FilterHolder, PostHolder } from './PlaceHolders'
import usePersons from '@/hooks/list/usePersons'
import { BasePaneM } from '@/sections/BasePane'



const PersonList = () => {

    const params = useParams()
    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(personFilter)
    const layout = useRecoilValue(layoutSize)

    const [isLoading1, isError1, components] = usePersons(params.person_id, filter)
    const [isLoading, isError, component] = usePerson(params.person_id)

    console.log('person list', components, component)


    if (layout === 'mobile') return (
        <BasePaneM>
            <VirtuList
                list={
                    (isError || isLoading || isError1 || isLoading1) ?
                        [<HeadHolder />, <FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                        [component, <PersonFilter key={'filter'} />, ...components]
                } />
        </BasePaneM>)


    return (<>
        <Outlet />
        <motion.div
            key={params.person_id}
            css={overList}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0.5 }}
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