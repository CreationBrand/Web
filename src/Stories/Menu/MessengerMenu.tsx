/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Menu } from '@mui/base';
import { MenuItem } from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


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


const MessengerMenu = ({ anchorEl, onClose, messenger_id, status }: any) => {



    const handleDelete = async () => {

    }


    return <StyledPopper
        disablePortal={false}

        modifiers={[{
            name: "offset",
            options: { offset: [0, 8] }
        }]}
        id={'messengerMenu'} open={Boolean(anchorEl)} anchorEl={anchorEl} placement='left-start'>
        <ClickAwayListener onClickAway={onClose}>

            <div>
                {status === 'owner' && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
                {/* <MenuItem onClick={onClose}>Close</MenuItem>
                <MenuItem onClick={onClose}>Block</MenuItem> */}
            </div>



        </ClickAwayListener>
    </StyledPopper>

}



export default MessengerMenu



