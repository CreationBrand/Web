/** @jsxImportSource @emotion/react */
import Avatar from '@/components/bits/Avatar';
import { bg_hover, text_1, text_3 } from '@/global/var';
import { leaveCommunity, joinCommunity } from '@/service/Action';
import { isAdmin } from '@/service/Rbac';
import { authFlow } from '@/state/flow';
import { layoutSize } from '@/state/layout';
import { communityList } from '@/state/person';
import { handleImgError } from '@/utils/stopPropagation';
import { css } from '@emotion/react'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';




export const CommunityPaneM = (props: any) => {

    let community = props?.community

    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const communitys = useRecoilValue(communityList)
    const layout = useRecoilValue(layoutSize)
    const auth = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)

    const handleEdit = (e: any) => {
        e.stopPropagation()
        navigate(`/c/${community?.public_id}/edit`)
    }

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(community?.public_id)
        else joinCommunity(community?.public_id)
    }

    const openCommunity = () => setActive(!active)

    useEffect(() => {
        if (!communitys) return
        const hasMatchingId = communitys.some((obj: any) => obj.public_id === community?.public_id);
        setIsMember(hasMatchingId)
    }, [communitys])







    return (
        <div css={{ padding: '0px 8px 0px 8px' }}>

            <img css={{ width: '100%', height: '80px', borderRadius: '12px', }}
                onError={handleImgError}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${community?.public_id}`} />

            <div css={{ display: 'flex', padding: '8px 0px', gap: '8px' }}>
                <Avatar public_id={community?.public_id} size='headerMobile' />
                <div>
                    <div css={{ fontWeight: 700, fontSize: '18px', color: text_1, lineHeight: '27px' }}>{community?.title}</div>
                    <div css={{ fontSize: '12px', color: text_3, lineHeight: '18px' }}>{community?.subscribers} Members {props?.online} Online </div>
                </div>

                <div css={{ marginLeft: 'auto' }} />

                <div>


                    <Button
                        disabled={auth === 'guest' || isAdmin(props?.communityHex)}
                        onClick={handleJoin}
                        disableElevation
                        sx={{
                            marginLeft: 'auto !important',
                            background: bg_hover,
                            borderRadius: '16px',
                            fontSize: '10px',
                            fontWeight: '700',
                            "&.Mui-disabled": {
                                background: bg_hover,
                                color: "#827d7d !important",
                                ':hover': {
                                    background: "#0f0e10",
                                }
                            }
                        }}
                        variant="contained">
                        {isMember ? 'LEAVE' : 'JOIN'}
                    </Button>
                </div>



            </div>


        </div>)
};