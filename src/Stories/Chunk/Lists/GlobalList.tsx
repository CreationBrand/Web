/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'
import VirtuList from '../VirtualList/VirtuList'
import usePostList from 'Hooks/Pull/usePostList'
import VirtualList from '../VirtualList/VirtualList'
import { useRecoilValue } from 'recoil'
import { bindState } from 'State/atoms'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
    })
}

const GlobalList = ({ type }: any) => {



    const [isLoading, isError, components] = usePostList(type, 'none')

    useContentFlow('global')
    useCommunityFlow(null)

    return (
        <div

        >
            <VirtualList list={components} public_id={type} />
        </div>
    )
}


export default memo(GlobalList)