import * as React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Picker from '../Picker/Picker';
import Drawer from '../Drawer/Drawer';
import { set } from 'date-fns';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import { layoutSizeData } from 'State/Data';
import { useRecoilValue } from 'recoil';


const RightMenu = ({ children, tags, public_id, type }: any) => {
    const layoutSize: any = useRecoilValue(layoutSizeData)

    const [anchorEl, setAnchorEl]: any = useState(null);
    const [tagAnchorEl, setTagAnchorEl]: any = useState(null);


    const handleClick = (e: any) => {
        // e.preventDefault()
        // e.stopPropagation()
        setAnchorEl(e.currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTagAnchorEl(null);
        setOpen(false)
    };

    const handle1 = (e: any) => {
        setTagAnchorEl(e.currentTarget);
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

                    <Picker placement={'left-start'} setAnchorEl={setTagAnchorEl} anchorEl={tagAnchorEl} current={tags} public_id={public_id} type={type} />

                    <Menu
                        sx={{

                            '& .MuiPaper-root': {
                                borderRadius: '4px !important',
                                background: '#0f0e10 !important',
                                padding:'6px 8px',
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
                        <MenuItem onClick={handle1}>
                            <EditAttributesIcon />
                            Tags
                        </MenuItem>
                        <MenuItem>
                            <AdminPanelSettingsOutlinedIcon />
                             Roles
                        </MenuItem>
                        <MenuItem>
                            <ReportGmailerrorredRoundedIcon />
                            Report
                        </MenuItem>

                    </Menu >
                </>
            }
        </div >
    );
}


export default RightMenu