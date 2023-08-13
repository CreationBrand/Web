/** @jsxImportSource @emotion/react */
import { bg_1 } from '@/global/var';
import { css } from '@emotion/react'
import zIndex from '@mui/material/styles/zIndex';
import { AnimatePresence, motion } from 'framer-motion';


const Swipper = ({ children }: any) => {




    return <motion.div
        css={{
            width: '100%',
            height: '100vh !important',
            backgroundColor: bg_1,
            zIndex: 1000,
            position: 'fixed',
            overflow: 'hidden',
            top: 0,
            left: 0,
        }}
        transition={{ duration: 0.2 }}
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ opacity: 0 }}
    >
            {children}

    </motion.div>
}







export default Swipper;