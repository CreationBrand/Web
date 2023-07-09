/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { socketRequest } from 'Service/Socket'
import Avatar from '../Avatar/Avatar'
import { textLabel } from 'Global/Mixins'
import { useRecoilValue } from 'recoil'
import { authFlow } from 'State/Flow'
import LiveRoles from 'Stories/Alive/LiveRoles'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Tooltip } from '@mui/material'
import { block } from 'Util/stopPropagation'

const C = {
    underline: css({
        fontSize: '16px',
        height: '20px',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        color: '#fff',
        textDecoration: 'none',
        textDecorationThickness: '2px !important',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const Author = ({ title, public_id, community_id, global_roles }: any) => {

    return (
        <Tooltip
            disableTouchListener
            componentsProps={{
                tooltip: {
                    sx: {
                        background: 'transparent !important',
                        margin: '4px 0px 0px 0px !important',
                        padding: '0px !important',
                    },
                },
            }}
            sx={{
                '& .MuiBackdrop-root': {
                    background: 'transparent !important',
                },
            }}
            placement='bottom-start'
            enterDelay={500}

            title={<Preview public_id={public_id} community_id={community_id} />}>
            <Link
                onClick={block}
                to={`/p/${public_id}`}
                css={C.underline}>
                {title}
            </Link>
        </Tooltip >


    )
}

export default memo(Author)


const D = {
    container: css({
        background: '#0f0e10',
        width: '360px',
        maxWidth: '360px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1e1e1e',
        boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%)',
        paddingBottom: '16px',
    }),
    banner: css({
        height: '60px',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
    }),
}

let Preview = ({ public_id, community_id }: any) => {



    let [data, setData]: any = useState(null)
    const authState = useRecoilValue(authFlow)


    useEffect(() => {
        (async () => {
            let temp: any = await socketRequest('person', { person_id: public_id, community_id: community_id })
            setData(temp.person)

        })()
    }, [public_id])

    if (!data) return null

    return (<AnimatePresence mode='popLayout'>


        <motion.div
            key={`preview`}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={D.container}>


            <img css={D.banner}
                onError={handleImgError}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}`} />


            <div css={{
                padding: '12px 12px 0px 12px',
                display: 'flex',
                gap: '8px',

            }}>
                <Avatar size='medium' public_id={public_id} />
                <div css={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    <h4 css={{
                        fontSize: '16px', textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}>{data.nickname}</h4>
                    <h5 css={{
                        fontSize: '14px', color: '#b9b6ba', textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontWeight: '400',
                    }}>@{data.username}</h5>


                </div>


            </div>
            {data.about_me &&
                <div css={{
                    padding: '12px 16px 0px 16px',
                    fontSize: '14px',
                    color: '#dbdee1',
                }}>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>About Me</div>
                    <ReactMarkdown children={data.about_me} rehypePlugins={[rehypeRaw]}></ReactMarkdown>

                </div>
            }


            <div css={{
                padding: '16px 16px 0px 16px',
                fontSize: '14px',
                display: 'flex',
                gap: '18px',
            }}>
                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Karma</div>
                    <div> {data.karma}</div>
                </div>
                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Posts</div>
                    <div> {data.posts}</div>
                </div>
                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Comments</div>
                    <div> {data.comments}</div>
                </div>

                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Global Role</div>
                    <LiveRoles value={data.global_roles} />
                </div>


            </div>


        </motion.div>



    </AnimatePresence >)
}


const handleImgError = (e: any) => e.target.style.display = 'none'
