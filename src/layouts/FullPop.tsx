import { bg_2 } from "@/global/var";
import { css } from "@emotion/react";
import { motion } from "framer-motion";


const s = css({
    width: '100vw',
    height: '100vh',
    padding: '8px',
    background: bg_2,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 400,
    top: 0,
    left: 0,
})



const FullPop = ({ children }: any) => {

    return (
        <motion.div
            css={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.2 }}>

                {children}

            </motion.div>

        </motion.div>)
};


export default FullPop