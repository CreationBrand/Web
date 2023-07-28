
import { motion } from 'framer-motion'
import { memo } from 'react'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { useRecoilValue } from 'recoil'


//@ts-ignore
import { baseList } from '@/global/mixins'
import { mainSize } from '@/state/layout'
import usePostList from '@/hooks/usePostList';
import GlobalFilter from '../bits/filter/GlobalFilter';
import Info from '../bits/Info';
import MainFilter from '../bits/filter/MainFilter'
import { communityFilter } from '@/state/filters'
import { FilterHolder, PostHolder } from './PlaceHolders'




const GlobalList = ({ type }: any) => {

    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(communityFilter(type))
    const [isLoading, isError, components] = usePostList('GLOBAL', type, filter)

    return (

        <motion.div
            key={type}
            css={baseList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList list={
                    isLoading ? [<FilterHolder key={0} />, <PostHolder key={1} />, <PostHolder key={2} />     ] :
                        [<MainFilter type={type} />, ...components]} public_id={type} />
            </div>

            {(size > 0) &&
                <div css={{ height: 'min-content', marginTop: '12px' }}>
                    {size > 1 && <Info />
                    }
                    <GlobalFilter />
                </div>
            }

        </motion.div>
    )
}


export default memo(GlobalList)

