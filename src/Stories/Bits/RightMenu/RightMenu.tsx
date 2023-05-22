/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { memo, useState } from 'react';
import Picker from '../Picker/Picker';
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

const RightMenu = ({ tags, public_id, person_id, type, community_roles, global_roles }: any) => {




    const layoutSize: any = useRecoilValue(layoutSizeData)

    const [anchorEl, setAnchorEl]: any = useState(null);
    const [tagAnchorEl, setTagAnchorEl]: any = useState(null);
    const [roleAnchorEl, setRoleAnchorEl]: any = useState(null);

    const content = useRecoilValue(contentFlow)
    const community: any = useRecoilValue(communityFlow)

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTagAnchorEl(null);
        setRoleAnchorEl(null);
        setOpen(false)
    };

    const handle1 = (e: any) => {
        setTagAnchorEl(e.currentTarget);
        setRoleAnchorEl(null);
    };

    const handle2 = (e: any) => {
        setTagAnchorEl(null);
        setRoleAnchorEl(e.currentTarget);
    };


    const [open, setOpen] = useState(false);


    return (
        <div css={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>


            <IconButton
                sx={{
                    color: '#d7dadc',
                    borderRadius: '8px'
                }}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            {open && <>
                {layoutSize === 'mobile' ?
                    <>
                        <Picker placement={'top'} setAnchorEl={setTagAnchorEl} anchorEl={tagAnchorEl} current={tags} public_id={public_id} type={type} />
                        <Drawer open={open} setOpen={setOpen}
                            css={{ background: '#272732' }}
                        >

                            <MenuItem onClick={handle1}>
                                <EditAttributesIcon />
                                Edit Tags
                            </MenuItem>
                            <MenuItem>
                                <ReportGmailerrorredRoundedIcon />
                                Report
                            </MenuItem>
                        </Drawer>
                    </>
                    :
                    <>
                        <CommunityRolePicker placement={'left-start'} setAnchorEl={setRoleAnchorEl} anchorEl={roleAnchorEl} person_id={person_id} current={community_roles} public_id={public_id} type={type} />
                        <Picker placement={'left-start'} setAnchorEl={setTagAnchorEl} anchorEl={tagAnchorEl} current={tags} public_id={public_id} type={type} />

                        <Menu
                            sx={{

                                '& .MuiPaper-root': {
                                    borderRadius: '4px !important',
                                    background: '#0f0e10 !important',
                                    padding: '6px 8px',
                                    // border: '2px solid #4a3b5a !important',
                                },


                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            {content !== 'global' &&
                                <MenuItem
                                    disabled={!canManageTags(community.roleHex)}
                                    onClick={handle1}>
                                    <EditAttributesIcon />
                                    Tags
                                </MenuItem>
                            }
                            {content !== 'global' &&
                                <MenuItem
                                    onClick={handle2}
                                    disabled={!canManageRole(community.roleHex)}
                                >
                                    <StyleRoundedIcon />
                                    Community Roles
                                </MenuItem>}

                            <MenuItem
                                disabled={!canManageGlobalRole()}>


                                <AdminPanelSettingsOutlinedIcon />
                                Global Roles
                            </MenuItem>
                            <MenuItem>
                                <ReportGmailerrorredRoundedIcon />
                                Report
                            </MenuItem>

                        </Menu >
                    </>
                }</>
            }
        </div >
    );
}


export default memo(RightMenu)