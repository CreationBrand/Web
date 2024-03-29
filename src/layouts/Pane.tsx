/** @jsxImportSource @emotion/react */
import { bg_1, bg_2, bg_list } from '@/global/var'
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

const s = css({
    width: '100%',
    zIndex: 200,
    top: '0px',
    background: bg_1,
    // borderRadius: '8px',
    overflowY: 'scroll',
    touchAction: 'pan-y',
    position: 'fixed',
})

const Pane = ({ children }: any) => {

    const layout = useRecoilValue(layoutSize)

    return <motion.div
        css={s}
        key={`pane`}
        style={{
            height: layout === 'desktop' ? 'calc(100% - 56px)' : 'calc(100% - 48px)',
            top: layout === 'desktop' ? '56px' : '48px',
            background: bg_list,
        }}
    // transition={{ duration: 0.2 }}
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    > {children}
    </motion.div>
}

export default memo(Pane)
