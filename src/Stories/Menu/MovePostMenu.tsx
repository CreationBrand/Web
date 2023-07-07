/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';

import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { socketRequest } from 'Service/Socket';

import { canMovePost } from 'Service/Rbac';
import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import { communityListData, layoutSizeData } from 'State/Data';
import { postSync } from "State/postAtoms";
import useCommunityData from 'Hooks/Pull/useCommunityData';
import Drawer from 'Stories/Bits/Drawer/Drawer';


const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingRight: '12px',
    width: '200px',
    backgroundColor: 'transparent',
}));


export default function MovePostMenu({ post_id, community_id }: any) {

    const data = useCommunityData(community_id)
    const communityList = useRecoilValue(communityListData)
    let updateSync = useSetRecoilState(postSync(post_id))
    const layout = useRecoilValue(layoutSizeData)

    const [anchorEl, setAnchorEl]: any = useState(null)


    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const handleClick = async (e: any) => {

        let req: any = await socketRequest('unsetPost', { post_id: post_id, community_id: e.currentTarget.dataset.test })

        updateSync((prevState: any) => ({
            ...prevState,
            visibility: false,
        }));

        if (req.status === 'ok') handleClose()

    }

    const open = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    };

    if (!data || !data.community.community_roles || !canMovePost(data.communityHex)) return null

    return (

        <MenuItem
            onMouseEnter={open}
            onMouseLeave={handleClose}
        >

            {(layout === "mobile" && Boolean(anchorEl)) && (<Drawer
                open={Boolean(anchorEl)}
                setOpen={setAnchorEl}
                onClose={handleClose}
            >
                <div css={{
                    maxHeight: '70vh',
                    overflow: 'scroll',
                    height: '100%',
                }}>
                    {communityList.map((tag: any) =>
                        <MenuItem
                            key={tag.public_id}
                            data-test={tag.public_id}
                            onClick={handleClick}
                        >
                            {tag.title}
                        </MenuItem>)}
                </div>
            </Drawer>

            )}

            {(layout === "desktop" && Boolean(anchorEl)) && (


                <StyledPopper
                    id='postMenu'
                    modifiers={[{ name: "offset", options: { offset: [0, -2] } }]}
                    open={Boolean(anchorEl)} anchorEl={anchorEl}   placement={'left-start'}>

                    <div
                        css={{
                            borderRadius: '4px',
                            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                            padding: '6px 8px',
                            backgroundColor: '#0f0e10',
                            maxHeight: '300px',
                            overflowY: 'auto',
                        }}
                    >
                        {communityList.map((tag: any) =>
                            <MenuItem
                                key={tag.public_id}
                                data-test={tag.public_id}
                                onClick={handleClick}
                            >
                                {tag.title}
                            </MenuItem>)}
                    </div>


                </StyledPopper >)}







            Move Post <MoveDownRoundedIcon />
        </MenuItem>

    );
}
