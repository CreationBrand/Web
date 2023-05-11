import * as React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Picker from '../Picker/Picker';

const options = [
    'Tags',
    'Atria',
    'Callisto',
    'Dione',
];

const ITEM_HEIGHT = 48;

const RightMenu = ({ children, tags, public_id, type }: any) => {


    const [anchorEl, setAnchorEl]: any = useState(null);
    const [tagAnchorEl, setTagAnchorEl]: any = useState(null);


    const handleClick = (e: any) => {
        // e.preventDefault()
        // e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTagAnchorEl(null);
    };

    const handle1 = (e: any) => {
        // e.preventDefault()
        // e.stopPropagation()
        setTagAnchorEl(e.currentTarget);
    };


    const [openTags, setOpenTags] = useState(false);

    return (
        <div css={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>


            <IconButton
                sx={{ color: '#d7dadc', borderRadius: '12px' }}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
            
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
                <div onClick={handle1} css={{
                    width: '100%',
                    padding: '8px',
                    paddingBottom: '0px',
                }}>
                    <Picker setAnchorEl={setTagAnchorEl} anchorEl={tagAnchorEl} current={tags} public_id={public_id} type={type} />
                </div>
            </Menu >
        </div >
    );
}


export default RightMenu