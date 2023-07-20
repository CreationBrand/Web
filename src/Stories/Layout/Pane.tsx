/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'

const s = css({
    width: '100%',
    zIndex: 200,
    position: 'absolute',
    top: '56px',
    height: 'calc(100% - 56px)',
    background: '#0f0e10',
    borderRadius: '8px',
    overflowY: 'scroll',
    touchAction: 'pan-y',

})

const Pane = ({ children }: any) => {
    return <motion.div
        css={s}
        key={`pane`}
        // transition={{ duration: 0.2 }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
    > {children}
    </motion.div>
}

export default memo(Pane)
