
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { textLabel } from "Global/Mixins";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Online from "../Online/Online";
import Avatar from '../Avatar/Avatar';



const D = {
    container: css({
        // background: '#272732',
        width: '240px',
        maxWidth: '240px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
        cursor: 'pointer',

    }),
    banner: css({
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
    }),
    action: css({
        marginLeft: 'auto',
        zIndex: 100,
    }),
}



const CommunityPreview = (props: any) => {


    const params: any = useParams()


    if (!props) return <div css={{ width: '240px', height: '164px', marginBottom: '8px' }}></div>

    return <div>
        <Link css={{ all: 'unset' }} to={`/c/${props?.community?.public_id}`}>

            <motion.div
                key={`preview`}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={D.container}>


                <img css={D.banner}
                    onError={handleImgError}
                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${props?.community?.public_id}`} />

                <div css={{
                    padding: '12px 0px 0px 0px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',

                }}>
                    <Avatar size='medium' public_id={params.community_id} />
                    <div css={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}>
                        <h4 css={{
                            color: '#dbdee1',
                            fontSize: '16px', textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}>{props?.community?.title}</h4>
                    </div>


                </div>

                <div css={{
                    padding: '12px 8px 0px 0px',
                    fontSize: '14px',
                    display: 'flex',
                    gap: '18px',
                }}>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Members</div>
                        <div css={{
                            color: '#fff',
                            fontWeight: 700,
                        }}>
                            <span css={{
                                display: ' inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#c4c9ce',
                                marginRight: '4px',
                            }} />{props?.community?.subscribers}</div>
                    </div>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Online</div>
                        <Online value={props?.online} />

                    </div>

                </div>

            </motion.div> </Link>


    </div>
};




export default CommunityPreview;



const handleImgError = (e: any) => e.target.style.display = 'none'
