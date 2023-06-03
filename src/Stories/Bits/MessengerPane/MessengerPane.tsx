/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo, useState } from 'react'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MessengerMenu from 'Stories/Menu/MessengerMenu';

const C = {
    container: css({
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: '#181820',
        borderRadius: '8px',
        padding: '8px',
        color: "#b9bbbe",
        fontSize: '12px',
        fontWeight: 500,
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        zIndex: 200,
    }),
}


const MessengerPane = ({ public_id, status }: any) => {

    const [anchorEl, setAnchorEl]: any = useState(null);
    const [open, setOpen] = useState(false)

    const handleOpen = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        console.log('handleClose')
        if (anchorEl) anchorEl.focus();
        setAnchorEl(null);
    };


    return <>
        <div css={C.container} onClick={handleOpen}>
            {status}
            <SettingsRoundedIcon sx={{ fontSize: '16px' }} />
        </div>
        <MessengerMenu anchorEl={anchorEl} onClose={handleClose} messenger_id={public_id} status={status} />
    </>
}





export default memo(MessengerPane)