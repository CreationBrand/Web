/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { ClickAwayListener, IconButton, MenuItem, Popper, styled } from '@mui/material';
import { memo, useState } from 'react';
import RoleMenu from './RoleMenu';
import TagMenu from './TagMenu';

// icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';

import { useRecoilValue } from 'recoil';
import { contentFlow } from '@/state/flow';
import { layoutSize } from '@/state/layout';
import Drawer from '../bits/Drawer';
import { bg_1 } from '@/global/var';
import { iconButton } from '@/global/mixins';


const StyledPopper = styled(Popper)(() => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingTop: '12px',
    width: '150px',
    backgroundColor: 'transparent',
}));



const CommentMenu = ({ person_id, comment_id, community_id, tags, global_roles, community_roles }: any) => {

    const [anchorEl, setAnchorEl]: any = useState(null);
    let content = useRecoilValue(contentFlow)
    const layout = useRecoilValue(layoutSize)

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (<div onClick={(e) => e.stopPropagation()}>

        <div css={iconButton}

            onClick={handleClick}
            onMouseLeave={handleClose}
        >
            <MoreVertIcon sx={{ fontSize: '18px' }} />


            {(layout === "mobile" && Boolean(anchorEl)) && (<Drawer
                open={Boolean(anchorEl)}
                setOpen={setAnchorEl}
                onClose={handleClose}
            >
                <TagMenu community_id={community_id} current={tags} public_id={comment_id} type={'comment'} />
                <RoleMenu community_id={community_id} current={community_roles} person_id={person_id} public_id={comment_id} type={'comment'} />
                <MenuItem>Report <ReportGmailerrorredRoundedIcon /></MenuItem>
            </Drawer>

            )}

            {(layout === "desktop" && Boolean(anchorEl)) && (


                <StyledPopper
                    id='postMenu'
                    modifiers={[{ name: "offset", options: { offset: [0, -8] } }]}
                    open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom-end'>

                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            css={{
                                borderRadius: '8px',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                padding: '6px 8px',
                                backgroundColor: bg_1,
                            }}
                        >
                            <TagMenu community_id={community_id} current={tags} public_id={comment_id} type={'comment'} />
                            <RoleMenu community_id={community_id} current={community_roles} person_id={person_id} public_id={comment_id} type={'comment'} />
                            <MenuItem>Report <ReportGmailerrorredRoundedIcon /></MenuItem>
                        </div>

                    </ClickAwayListener>
                </StyledPopper >)}


        </div>

    </div >)
}



export default memo(CommentMenu)