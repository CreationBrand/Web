/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Drawer, MenuItem } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { communityFlow, contentFlow } from 'State/Flow';

// ICONS
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { layoutSizeData } from 'State/Data';
import { canManageTags } from 'Service/Rbac';
import { useEffect, useState } from 'react';
import TagMenu from './TagMenu';

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 1000,
    borderRadius: '4px',
    position: 'absolute',
    fontSize: 13,
    color: '#f2f3f5',
    padding: '6px 8px',
    minWidth: '180px',
    backgroundColor: '#0f0e10',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
}));


const PostMenu = ({ anchorEl, setAnchorEl, community_roles, tags, public_id, type }: any) => {

    let layout = useRecoilValue(layoutSizeData)
    let content = useRecoilValue(contentFlow)
    let community = useRecoilValue(communityFlow)

    const [aTags, setATags] = useState(null)

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
        setATags(null)
    };

    const openTag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setATags(e.currentTarget);
    };

    if (!anchorEl) return null



    if (layout === 'mobile') return <Drawer anchor='bottom' open={Boolean(anchorEl)} onClose={handleClose}>

        <MenuItem>Tags<StyleRoundedIcon /></MenuItem>
        <MenuItem>Community Roles <EditAttributesIcon /></MenuItem>
        <MenuItem>Global Roles <AdminPanelSettingsOutlinedIcon /></MenuItem>
        <MenuItem>Moderate <GavelRoundedIcon /></MenuItem>
        <MenuItem>Report <ReportGmailerrorredRoundedIcon /></MenuItem>

    </Drawer>


    return <StyledPopper id='postMenu'
        disablePortal={false}
        modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
        open={Boolean(anchorEl)} anchorEl={anchorEl} placement='left-start'>

        <ClickAwayListener onClickAway={handleClose}>
            <div>
                {aTags && <TagMenu placement={'left-start'} setAnchorEl={setATags} anchorEl={aTags} current={tags} public_id={public_id} type={type} />}

                <MenuItem onClick={openTag} disabled={!canManageTags(community_roles)}>Tags<StyleRoundedIcon /></MenuItem>
                <MenuItem>Community Roles <EditAttributesIcon /></MenuItem>
                <MenuItem>Global Roles <AdminPanelSettingsOutlinedIcon /></MenuItem>
                <MenuItem>Moderate <GavelRoundedIcon /></MenuItem>
                <MenuItem>Report <ReportGmailerrorredRoundedIcon /></MenuItem>
            </div>

        </ClickAwayListener>
    </StyledPopper>
}



export default PostMenu



