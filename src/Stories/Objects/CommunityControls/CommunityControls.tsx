/** @jsxImportSource @emotion/react */


import { Tooltip, IconButton, css, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Divider, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useState } from "react";
import { smBold, xsMuted } from "Stories/Text/Text";
import CreateCommunity from "Stories/Forum/CreateCommunity";


const C = {
    container: css({
        width: '100%',
        height: '50px',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#16181b',
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
    }),
}


const CommunityControls = () => {

    const [open1, setOpen1] = useState(false);
    const handleClickOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    return <div css={C.container}>



        <Tooltip title="Create Community" arrow>
            <IconButton
                onClick={handleClickOpen1}
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <AddIcon />
            </IconButton>
        </Tooltip>


        <CreateCommunity open={open1} handleClose={handleClose1}/>

        <Tooltip title="Unfold" arrow>
            <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <UnfoldLessIcon />
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
                <UnfoldMoreIcon />
            </IconButton>
        </Tooltip>

        <Tooltip title="Filter" arrow>
            <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <FilterNoneIcon />
            </IconButton>
        </Tooltip>


    </div>
}



export default CommunityControls