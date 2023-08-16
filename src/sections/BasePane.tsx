import { bg_1, bg_2 } from "@/global/var";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";


const s = css({
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 50,
    gap: '12px',
    background: bg_1,
})



export const BasePaneM = ({ children, id }: any) => {

    return (
        <div css={s}>
            <motion.div
                key={id}
                css={{ height: '100%', width: '100%' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}>
                {children}
            </motion.div>
        </div>
    )
};



const c = css({
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 50,
})



export const BasePaneD = ({ children }: any) => {

    return (

        <motion.div css={c} >

            <motion.div
                css={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', gap: '12px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut' }}>

                {children}

            </motion.div>

        </motion.div>
    )
};


