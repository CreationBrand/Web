/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { memo, useState } from 'react';
import Picker from '../../Menu/TagMenu';
import Drawer from '../Drawer/Drawer';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import { globalHex, layoutSizeData } from 'State/Data';
import { useRecoilValue } from 'recoil';

import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { communityFlow, contentFlow } from 'State/Flow';
import { canManageGlobalRole, canManageRole, canManageTags } from 'Service/Rbac';
import CommunityRolePicker from '../Picker/CommunityRolePicker';
import PostMenu from 'Stories/Menu/PostMenu';

const RightMenu = ({ tags, public_id, person_id, type, community_roles, }: any) => {

    const [anchorEl, setAnchorEl]: any = useState(null);

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);


    return (
        <div css={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
            {Boolean(anchorEl) && (
                <PostMenu
                    person_id={person_id}
                    tags={tags}
                    type={type}
                    public_id={public_id}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    community_roles={community_roles} />)}
            <IconButton
                sx={{
                    color: '#d7dadc',
                    borderRadius: '8px'
                }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

        </div >
    );
}


export default memo(RightMenu)