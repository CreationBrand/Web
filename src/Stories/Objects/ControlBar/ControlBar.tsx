/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Tooltip, IconButton } from '@mui/material';
import { useState } from 'react';
import CreatePost from 'Stories/Forum/CreatePost';

import AddBoxIcon from '@mui/icons-material/AddBox';

const C = {
    container: css({
        width: 'calc(100% - 40px)',
        margin: 'auto',
        height: '40px',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '8px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }),
}



const ControlBar = () => {
    let [open1, setOpen1] = useState(false);

    let handleOpen1 = () => setOpen1(true);
    let handleClose1 = () => setOpen1(false);


    return <div css={C.container}>


        {/* CREATE POST */}
        <Tooltip title="Create Post" arrow>

            <IconButton
                onClick={handleOpen1}
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <AddBoxIcon />
            </IconButton>
        </Tooltip>


        <CreatePost open={open1} handleClose={handleClose1} />





    </div>;

}



export default ControlBar