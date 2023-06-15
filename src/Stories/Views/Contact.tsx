/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { bindState } from 'State/atoms';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';


const C = {
    container: css({
        width: '100%',
        height: 'calc(100% - 56px)',
        padding: '22px',
        scrollbarGutter: 'stable both-edges',
        overflow: 'auto',
        marginTop: '8px',
        borderRadius: '8px',
        color: "#fff",
        touchAction:'pan-y',
    }),
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
    }),

}

const Contact = () => {



    return (


        <motion.div
            css={C.container}
            key={`contact`}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>



            <div css={C.inner}>

                <div css={{
                    marginBottom: "16px",
                    fontSize: "44px",
                    fontWeight: 450,
                    lineHeight: "48px",
                    color: "#fff",
                }}>Contact Us...</div>

                <div css={{
                    marginBottom: "16px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE"
                }}>
                    We understand that you may have questions, and we're here to provide the answers you need. Our team is dedicated to ensuring your inquiries are addressed and that you have a seamless experience with our services.                </div>
                <div css={{
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "20px",
                    color: "#a298f7"
                }}>Last updated June 3, 2023</div>

                <div css={{
                    marginTop: "32px",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: "20px"

                }}>Email</div>
                <div css={{
                    marginTop: "14px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE",
                    whiteSpace: "pre-wrap"
                }}>artramhelp@gmail.com</div>

            </div>
        </motion.div>
    )

}


export default Contact

