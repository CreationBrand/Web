import { bg_1, bg_2 } from "@/global/var";
import { css } from "@emotion/react";
import { motion } from "framer-motion";


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



export const OverPaneM = ({ children }: any) => {

    return (
        <motion.div
            css={{
                width: '100%',
                height: '100vh !important',
                backgroundColor: bg_2,
                zIndex: 1000,
                position: 'fixed',
                overflow: 'hidden',
                top: 0,
                left: 0,
            }}

            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
};



const c = css({
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    zIndex: 100,
    background: bg_1,
})



export const OverPaneD = ({ children }: any) => {

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


