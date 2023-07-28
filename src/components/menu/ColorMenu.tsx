/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { HexColorPicker } from 'react-colorful';

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 2000,
    borderRadius: '4px',
    position: 'absolute',
    fontSize: 13,
    color: '#f2f3f5',
    padding: '6px 8px',
    minWidth: '180px',
    backgroundColor: '#0f0e10',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
}));


const ColorMenu = ({ anchorEl, onClose, onChange }: any) => {

    const handleChange = (color: any) => {
        onChange(parseInt(color.slice(1), 16))
    }


    return <StyledPopper
        disablePortal={false}
        modifiers={[{
            name: "offset",
            options: { offset: [0, 8] }
        }]}
        id={'colorMenu'} open={Boolean(anchorEl)} anchorEl={anchorEl} placement='top'>
        <ClickAwayListener onClickAway={onClose}>

            <div>
                <HexColorPicker
                    onChange={handleChange}
                />

            </div>



        </ClickAwayListener>
    </StyledPopper>

}



export default ColorMenu



