/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconButton, MenuItem } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { contentFlow } from 'State/Flow';

// ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { memo, useState } from 'react';
import TagMenu from './TagMenu';
import RoleMenu from './RoleMenu';
import MovePostMenu from './MovePostMenu';
import Moderate from './Moderate';
import { layoutSizeData } from 'State/Data';
import Drawer from 'Stories/Bits/Drawer/Drawer';




const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingTop: '12px',
    width: '150px',
    backgroundColor: 'transparent',
}));


const PostMenu = ({ person_id, community_roles, tags, post_id, community_id }: any) => {

    const flow = useRecoilValue(contentFlow)

    const layout = useRecoilValue(layoutSizeData)
    const [anchorEl, setAnchorEl]: any = useState(null);

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        if (anchorEl) anchorEl.focus();
        setAnchorEl(null);
    };





    return (<div css={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>

        <IconButton
            sx={{
                height: '40px',
                width: '40px',
                color: '#b9b6ba',
                borderRadius: '8px'
            }}
            onClick={handleClick}
            onMouseLeave={handleClose}
        >
            <MoreVertIcon />


            {(layout === "mobile" && Boolean(anchorEl)) && (<Drawer
                open={Boolean(anchorEl)}
                setOpen={setAnchorEl}
                onClose={handleClose}
            >
                <TagMenu community_id={community_id} current={tags} public_id={post_id} type={'post'} />
                <RoleMenu community_id={community_id} current={community_roles} person_id={person_id} public_id={post_id} type={'post'} />
                <MovePostMenu community_id={community_id} post_id={post_id} />
                <MenuItem disabled={true}>Global Roles <AdminPanelSettingsOutlinedIcon /></MenuItem>
                <Moderate />
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
                                borderRadius: '4px',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                padding: '6px 8px',
                                backgroundColor: '#0f0e10',
                            }}
                        >

                            <TagMenu community_id={community_id} current={tags} public_id={post_id} type={'post'} />
                            <RoleMenu community_id={community_id} current={community_roles} person_id={person_id} public_id={post_id} type={'post'} />
                            <MovePostMenu community_id={community_id} post_id={post_id} />
                            <MenuItem disabled={true}>Global Roles <AdminPanelSettingsOutlinedIcon /></MenuItem>
                            <Moderate />
                            <MenuItem>Report <ReportGmailerrorredRoundedIcon /></MenuItem>
                        </div>

                    </ClickAwayListener>
                </StyledPopper >)}

        </IconButton>

    </div >)


}



export default memo(PostMenu)



