/** @jsxImportSource @emotion/react */


import { Tooltip, IconButton, css, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Divider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

import { Link } from "react-router-dom";
// import LivePermissions from "./Alive/LivePermissions";
import FilterMenu from "../menu/FilterMenu";
import { bg_1, bg_3 } from "@/global/var";

const C = {
    container: css({
        width: '100%',
        height: '40px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: bg_3,
        borderRadius: '8px',
    }),
}


const CommunityControls = () => {

    return <div css={C.container}>





        <Tooltip title="Create Community" arrow>
            <Link to='create-community' relative="path">
                <IconButton
                    size="small"
                    color="secondary" sx={{
                        borderRadius: '4px',
                        height: '32px',
                        width: '32px',
                    }}>
                    <AddIcon sx={{ fontSize: '28px' }} />
                </IconButton>
            </Link>
        </Tooltip>


        <Tooltip title="Add Group" arrow>
            <Link to='create-group' relative="path">
                <IconButton
                    size="small"
                    color="secondary" sx={{
                        borderRadius: '4px',
                        height: '32px',
                        width: '32px',
                    }}>
                    <LibraryAddIcon sx={{ fontSize: '20px' }} />
                </IconButton>
            </Link>
        </Tooltip>

        <Tooltip title="Help" arrow>
            <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <HelpOutlineRoundedIcon sx={{ fontSize: '24px' }} />
            </IconButton>
        </Tooltip>

        <FilterMenu />
        {/* <LivePermissions /> */}

    </div>
}



export default CommunityControls