/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import useCommunityData from '@/hooks/useCommunityData'
import { authFlow } from '@/state/flow'
import { block, cancel } from '@/utils/stopPropagation'
import { Tooltip, Button } from '@mui/material'
import { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Avatar from '../../bits/Avatar'
import { formatTime } from '@/utils/formatTime'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
// @ts-ignore
import TimeAgo from 'react-timeago'
import { time } from '@/global/mixins'
import { communityList } from '@/state/person'
import { text_1 } from '@/global/var'

const C = {
    link: css({
        all: 'unset',
        fontSize: '16px',
        height: '18px',
        maxHeight: '18px',
        lineHeight: '18px',
        alignItems: 'center',
        fontWeight: 'bold',
        color: text_1,
        textDecoration: 'none',
        textDecorationThickness: '2px !important',
        textDecorationColor: '#f2f3f5 !important',
        textDecorationSkip: 'none !important',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },

    }),

}

const CommunityTitle = ({ title, public_id, created_at }: any) => {

    if (!title || !public_id) return null

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
            enterDelay={1000}
            title={<Preview public_id={public_id} />}

        >
            <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                <Link onClick={block} to={`/c/${public_id}`} css={C.link}>{title}</Link>
                {created_at && <div css={time}><TimeAgo date={created_at} formatter={formatTime} /></div>}
            </div>
        </Tooltip >

    )
}

export default memo(CommunityTitle)


const D = {
    container: css({
        background: '#0f0e10',
        width: '360px',
        maxWidth: '360px',
        borderRadius: '16px',
        border: '1px solid #1e1e1e',
        minHeight: '125px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Helvetica Neue", Arial, sans-serif !important',
    }),
    banner: css({
        height: '60px',
        width: '100%',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
    }),
    action: css({
        marginLeft: 'auto',
        zIndex: 100,
    }),
}

let Preview = ({ public_id }: any) => {



    const data = useCommunityData(public_id)

    const authState = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)
    const communitys: any = useRecoilValue(communityList)

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        // if (isMember) leaveCommunity(public_id)
        // else joinCommunity(public_id)
    }


    // find out if your a member
    useEffect(() => {
        if (!communitys) return
        const hasMatchingId = communitys.some((obj: any) => obj.public_id === public_id);
        setIsMember(hasMatchingId)
    }, [public_id])

    if (!data) return null

    return (

        <div css={D.container} onClick={cancel}>


            <img css={D.banner}
                onError={handleImgError}
                // @ts-ignore
                src={`${import.meta.env.VITE_CLOUDFRONT}/banner/${data.community.public_id}`} />

            <div css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
            }}>


                <div css={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',

                }}>
                    <Avatar size='medium' public_id={public_id} />
                    <div css={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}>
                        <h4 css={{
                            color: '#f2f3f5',

                            fontSize: '16px', textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}>{data.community.title}</h4>
                    </div>

                    {authState !== 'guest' && <div css={D.action}>
                        <Button
                            // disabled={isAdmin(data?.communityHex)}
                            onClick={handleJoin}
                            disableElevation
                            sx={{
                                marginLeft: 'auto !important',
                                background: '#0f0e10',
                                borderRadius: '16px',
                                fontSize: '12px',
                                fontWeight: '700',
                            }}
                            variant="contained">{isMember ? 'LEAVE' : 'JOIN'}</Button>
                    </div>
                    }

                </div>

                <ReactMarkdown className='text' children={data.community.description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>

                <div css={{
                    fontSize: '14px',
                    display: 'flex',
                    gap: '18px',
                }}>
                    <div>
                        <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Members</div>
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
                            }} />{data.community.subscribers}</div>
                    </div>
                    <div>
                        <div css={{ marginBottom: '4px', color: '#f2f3f5' }}>Online</div>
                        {/* <Online value={data?.online} /> */}

                    </div>

                </div>

            </div>

        </div>)
}


const handleImgError = (e: any) => e.target.style.display = 'none'
