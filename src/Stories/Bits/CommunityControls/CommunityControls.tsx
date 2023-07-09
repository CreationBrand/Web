/** @jsxImportSource @emotion/react */


import { Tooltip, IconButton, css, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Divider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import AddGroup from "Stories/Popups/AddGroup";
import FilterMenu from "Stories/Menu/FilterMenu";
import LivePermissions from "Stories/Alive/LivePermissions";
import { Link } from "react-router-dom";

const C = {
    container: css({
        width: '100%',
        height: '40px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#272732',
        borderRadius: '8px',
    }),
}


const CommunityControls = () => {

    const [open1, setOpen1] = useState(false);
    const handleClickOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [group, setGroup] = useState(false);
    const groupClose = () => setGroup(false);

    return <div css={C.container}>


        <AddGroup open={group} onClose={groupClose} />

        <FilterMenu />



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
            <IconButton
                onClick={() => setGroup(true)}
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <LibraryAddIcon sx={{ fontSize: '20px' }} />
            </IconButton>
        </Tooltip>


        <LivePermissions />

    </div>
}



export default CommunityControls