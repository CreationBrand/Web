/** @jsxImportSource @emotion/react */
import LiveRoles from '@/components/bits/Alive/LiveRoles'
import Avatar from '@/components/bits/Avatar'
import { socketRequest } from '@/hooks/util/useSocket'
import { block, cancel } from '@/utils/stopPropagation'
import { css } from '@emotion/react'
import { Tooltip } from '@mui/material'
import { memo, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'

// @ts-ignore
import TimeAgo from 'react-timeago'
import { time } from '@/global/mixins'
import { formatTime } from '@/utils/formatTime'
import { text_2 } from '@/global/var'


const C = {
    link: css({
        all: 'unset',
        fontSize: '14px',
        height: '18px',
        maxHeight: '18px',
        lineHeight: '18px',
        alignItems: 'center',
        fontWeight: 'bold',
        color: text_2,
        textDecoration: 'none',
        textDecorationThickness: '2px !important',
        textDecorationColor: '#b9bbb3 !important',
        textDecorationSkip: 'none !important',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },

    }),

}
const Nickname = ({ title, public_id, community_id, global_roles ,created_at }: any) => {

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
            {/* <Link
                onClick={block}
                to={`/p/${public_id}`}
                css={C.underline}>
                {title}
            </Link> */}

            <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                <Link onClick={block}  to={`/p/${public_id}`} css={C.link}>{title}</Link>
                {created_at && <div css={time}><TimeAgo date={created_at} formatter={formatTime} /></div>}
            </div>

        </Tooltip >
    )
}

export default memo(Nickname)


const D = {
    container: css({
        background: '#0f0e10',
        width: '360px',
        maxWidth: '360px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        border: '1px solid #1e1e1e',
        paddingBottom: '16px',
        minHeight: '125px',
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


            {data.about_me && <ReactMarkdown className='text' children={data.about_me} rehypePlugins={[rehypeRaw]}></ReactMarkdown>}


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


