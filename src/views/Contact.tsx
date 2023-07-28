/** @jsxImportSource @emotion/react */
import Pane from '@/layouts/Pane';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';


const C = {
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px 12px 48px 12px',
    }),

}

const Contact = () => {



    return (
        <Pane>
            <Outlet />

            <div css={C.inner}>

                <h1>Contact Us...</h1>

                <p>
                    We understand that you may have questions, and we're here to provide the answers you need. Our team is dedicated to ensuring your inquiries are addressed and that you have a seamless experience with our services.
                </p>

                <div css={{
                    marginBottom: "12px",
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "20px",
                    color: "#a298f7"
                }}>Last updated July 11, 2023</div>

                <h2>Email</h2>
                <p>artramhelp@gmail.com</p>

                <h2>Discord</h2>
                <p>https://discord.gg/DHA8ZRpPMv</p>
            </div>
        </Pane >
    )

}


export default Contact

