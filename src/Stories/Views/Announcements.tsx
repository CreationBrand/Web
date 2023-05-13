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

const Announcements = () => {


    return (


        <motion.div
            css={C.container}
            key={`announcements`}
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
                }}>Content, Terms & Licensing...</div>

                <div css={{
                    marginBottom: "16px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE"
                }}>
                    Please take the time to thoroughly review the crucial information regarding our licensing terms of use and other policies provided on this page.
                </div>

                <div css={{
                    fontSize: "14px",
                    fontWeight: 450,
                    lineHeight: "20px",
                    color: "#a298f7"
                }}>Last updated May 12, 2023</div>


                <div css={{
                    marginTop: "32px",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: "20px"

                }}>Content</div>
                <div css={{
                    marginTop: "14px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE",
                    whiteSpace: "pre-wrap"
                }}>{`We take the posting of illegal content very seriously and have a strict policy in place to ensure that our platform is not used for such purposes. As such, we reserve the right to remove any content that we deem to be illegal.

We also reserve the right to terminate the accounts of users who post such content, in order to prevent further violations and protect the safety and well-being of our community. We may take additional actions, such as reporting such content to the relevant authorities, if necessary.   `}
                </div>

                <div css={{
                    marginTop: "32px",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: "20px"

                }}>Unwelcome Content</div>

                <div css={{
                    marginTop: "14px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE",
                    whiteSpace: "pre-wrap"
                }}>{`*  Illegal content
*  Involuntary pornography
*  Sexual or suggestive content involving minors
*  Doxing of private or confidential information
*  Impersonation of someone in a misleading or deceptive manner
*  Spamming, phishing, or otherwise malicious content`}
                </div>
                <div css={{
                    marginTop: "32px",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: "20px"

                }}>Intellectual property</div>

                <div css={{
                    marginTop: "14px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE",
                    whiteSpace: "pre-wrap"
                }}>{`As of present, Artram has refrained from committing to any specific licenses. Nonetheless, it is important to note that all copyrighted content or information submitted by users is retained under their ownership and control.

Artram respects the intellectual property rights of its users and does not claim ownership over their original works. Therefore, any content or information that is submitted to Artram is protected by applicable copyright laws, and users maintain full ownership and control of their submissions. Artram recognizes the importance of maintaining a transparent and ethical approach to intellectual property and will continue to respect the rights of its users.`}
                </div>

                <div css={{
                    marginTop: "32px",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: "20px"

                }}>Disclaimer</div>
                <div css={{
                    marginTop: "14px",
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#ADB7BE",
                    whiteSpace: "pre-wrap"
                }}>{`Artram does not provide any express or implied representation or warranty. Your use of the site is entirely at your own risk. The site may contain links to third-party content, which we do not endorse, warrant, or assume liability for.`}
                </div>

            </div>
        </motion.div>
    )

}


export default Announcements


