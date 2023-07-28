/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { Outlet, useParams } from 'react-router-dom'
import usePersonList from '@/hooks/usePersonList'
import { mainSize } from '@/state/layout'
import { personFilter } from '@/state/filters'
import { baseList, overList } from '@/global/mixins'
import usePerson from '@/hooks/usePerson'
import GlobalFilter from '../bits/filter/GlobalFilter'
import PersonFilter from '../bits/filter/PersonFilter'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { HeadHolder, FilterHolder, PostHolder } from './PlaceHolders'
import MeFilter from '../bits/filter/MeFilter'
import { person } from '@/state/person'
import useMe from '@/hooks/list/useMe'
import VirtualList from '../chunks/VirtualList/VirtualList'
import { memo } from 'react'



const MeList = () => {

    const params = useParams()
    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(personFilter)
    const me = useRecoilValue(person)

    const [isLoading, isError, component] = usePerson(me.public_id)
    const [isLoading1, isError1, components] = useMe(filter)



    return (<>
        <motion.div
            key={params.person_id}
            css={baseList}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
        >



            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                list={
                    (isLoading || isLoading1) ? [] :
                        [
                            component,
                            <MeFilter />,
                            ...components
                        ]} />
            </div>



            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>
    </>


    )
}


export default memo(MeList)