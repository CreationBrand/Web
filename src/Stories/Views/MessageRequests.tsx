

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { motion } from 'framer-motion';



const C = {
    container: css({
        width: '100%',
        height: 'calc(100% - 56px)',
        padding: '22px',
        scrollbarGutter: 'stable both-edges',
        overflow: 'auto',
        // background: '#272732',
        marginTop: '8px',
        borderRadius: '8px',
        color: "#fff",

    }),
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',

    }),

}

const MessageRequests = () => {


    return (


        <motion.div
            css={C.container}
            key={`announcements`}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>



            <div css={C.inner}>



            </div>
        </motion.div>
    )

}


export default MessageRequests


