/** @jsxImportSource @emotion/react */


import { Tooltip, IconButton, css, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Divider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useState } from "react";
import { smBold, xsMuted } from "Stories/Bits/Text/Text";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CreateCommunity from "Stories/Popups/CreateCommunity";

import AddGroup from "Stories/Popups/AddGroup";

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


        <CreateCommunity open={open1} onClose={ handleClose1} />
        <AddGroup open={group} handleClose={groupClose} />



        <Tooltip title="Create Community" arrow>
            <IconButton
                onClick={handleClickOpen1}
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <AddIcon sx={{ fontSize: '20px' }} />
            </IconButton>
        </Tooltip>



        <Tooltip title="Unfold" arrow>
            <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <UnfoldLessIcon sx={{ fontSize: '20px' }} />
            </IconButton>
        </Tooltip>



        <Tooltip title="Fold" arrow>
            <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <UnfoldMoreIcon sx={{ fontSize: '20px' }} />
            </IconButton>
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


    </div>
}



export default CommunityControls