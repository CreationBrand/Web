/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import { block, cancel } from '@/utils/stopPropagation'
import { socketRequest } from '@/hooks/util/useSocket'
import LiveRoles from '../../bits/Alive/LiveRoles'
import Avatar from '../../bits/Avatar'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { bg_1 } from '@/global/var'



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
        // fontFamily: 'noto sans',
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
                        borderRadius: '16px !important',
                        minHeight: '120px !important',
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
            enterDelay={600}
            title={<Preview community_id={community_id} public_id={public_id} />}>
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
        background: bg_1,
        width: '360px',
        maxWidth: '360px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1e1e1e',
        boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%)',
        paddingBottom: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Helvetica Neue", Arial, sans-serif !important',

    }),
    banner: css({
        height: '60px',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
    }),
}

let Preview = ({ public_id, community_id }: any) => {
    let [data, setData]: any = useState(null)

    useEffect(() => {
        (async () => {
            let temp: any = await socketRequest('person', { person_id: public_id, community_id: community_id })
            setData(temp.person)
        })()
    }, [public_id])

    if (!data) return <div css={D.container}></div>

    return (
        <div css={D.container} onClick={cancel}>

            <div css={{ display: 'flex', gap: '8px', }}>

                <Avatar size='medium' public_id={public_id} />

                <div css={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    <div css={{
                        color: '#f2f3f5',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: '20px',
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}>{data.nickname}</div>
                    <h5 css={{
                        fontSize: '14px',
                        color: '#b9bbb3',
                        lineHeight: '20px',
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontWeight: '400',
                    }}>@{data.username}</h5>


                </div>
            </div>


            {data.about_me &&
                <div>
                    <div css={{ fontSize: '12px', marginBottom: '4px', color: '#f2f3f5', fontWeight: 'bold', letterSpacing: '.02em' }}>ABOUT ME</div>
                    <ReactMarkdown className='text' children={data.about_me} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                </div>
            }


            <div css={{
                fontSize: '14px',
                display: 'flex',
                gap: '18px',
            }}>
                <div>
                    <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Karma</div>
                    <div> {data.karma}</div>
                </div>
                <div>
                    <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Posts</div>
                    <div> {data.posts}</div>
                </div>
                <div>
                    <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Comments</div>
                    <div> {data.comments}</div>
                </div>

                <div>
                    <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Global Role</div>
                    <LiveRoles value={data.global_roles} />
                </div>

            </div>
        </div>
    )
}
