
import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { useRecoilValue } from 'recoil'


//@ts-ignore
import { baseList } from '@/global/mixins'
import { layoutSize, mainSize } from '@/state/layout'
import GlobalFilter from '../bits/filter/GlobalFilter';
import Info from '../bits/Info';
import MainFilter from '../bits/filter/MainFilter'
import { communityFilter } from '@/state/filters'
import { FilterHolder, PostHolder } from './PlaceHolders'
import usePosts from '@/hooks/list/usePosts'
import { BasePaneD, BasePaneM } from '@/sections/BasePane'
import VirtualList from '../chunks/VirtualList/VirtualList'
import { ScrollRestoration } from 'react-router-dom'





const GlobalList = ({ type }: any) => {

    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(communityFilter(type))
    const [isLoading, isError, components] = usePosts('GLOBAL', type, filter, 'global')
    const layout = useRecoilValue(layoutSize)

    if (layout === 'mobile') return (
        <BasePaneM id={`GLOBAL/${type}/${filter}/global`}>
            <VirtualList
                public_id={type}
                list={isLoading ? [
                    <FilterHolder key={0} />, <PostHolder key={1} />, <PostHolder key={2} />] :
                    [<div css={{ height: '48px' }} />, <MainFilter type={type} />, ...components]} />
        </BasePaneM>
    )



    return (
        <BasePaneD>

            <VirtuList list={isLoading ? [
                <FilterHolder key={0} />, <PostHolder key={1} />, <PostHolder key={2} />] :
                [<MainFilter type={type} />, ...components]} public_id={type} />

            {(size > 0) &&
                <div css={{ height: 'min-content', marginTop: '12px' }}>
                    {size > 1 && <Info />}
                    <GlobalFilter />
                </div>
            }
        </BasePaneD>
    )
}


export default memo(GlobalList)

