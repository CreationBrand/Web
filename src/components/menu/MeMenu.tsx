/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { ClickAwayListener, MenuItem, Popper, styled } from '@mui/material';
import { memo, useState } from 'react';
import Avatar from '../bits/Avatar';

// icons

import { useNavigate } from 'react-router-dom';


//ICONS
import AppSettingsAltRoundedIcon from '@mui/icons-material/AppSettingsAltRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { contentFlow } from '@/state/flow';
import { useRecoilValue } from 'recoil';
import { person as personData } from '@/state/person';
import { signOut } from '@/service/Cognito';
import { header, iconButton, subheader } from '@/global/mixins';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { layoutSize } from '@/state/layout';
import Drawer from '../bits/Drawer';
import { bg_1, bg_2, bg_3, bg_active } from '@/global/var';


const StyledPopper = styled(Popper)(() => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingTop: '12px',
    width: '200px',
    backgroundColor: 'transparent',
}));


const C = {
    container: css({
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        background: bg_active,
        borderRadius: '8px',
        justifyContent: 'flex-start',
        padding: '8px',
        alignItems: 'center',
        gap: '8px',
    }),

    content: css({
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '80px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
    roles: css({
        display: 'flex',
    }),
    status: css({
        background: '#66bb6a',
        borderRadius: '8px',
        width: '4px',
        marginRight: '4px',
        marginLeft: '4px',
        height: '28px',
    }),
    list: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }),
}


const MeMenu = () => {

    const person = useRecoilValue(personData)
    const [anchorEl, setAnchorEl]: any = useState(null);
    const layout = useRecoilValue(layoutSize)

    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => signOut()
    const handleSettings = () => {
        navigate('/settings')
        handleClose()
    }



    return (

        <div id="person"
            onMouseLeave={handleClose}
            css={C.container} onClick={handleClick}>

            <Avatar public_id={person.public_id} size="small" />

            <div>
                <div css={{ fontSize: '14px', color: '#f2f3f5', fontWeight: 'bold', lineHeight: '18px' }}>{person.nickname}</div>
                <div css={{ fontSize: '12px', color: '#d7dadc', fontWeight: '400', lineHeight: '13px' }}>@{person.username}</div>
            </div>

            <div css={[iconButton, { marginLeft: 'auto' }]}>
                <MoreVertIcon />
            </div>

            {(layout === 'desktop' && Boolean(anchorEl)) && (<StyledPopper
                id='postMenu'
                modifiers={[{ name: "offset", options: { offset: [-8, -4] } }]}
                open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom'>

                <ClickAwayListener onClickAway={handleClose}>
                    <div
                        css={{
                            width: '216px',
                            borderRadius: '8px',
                            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                            padding: '6px 8px',
                            backgroundColor: bg_1,
                        }}
                    >

                        <MenuItem onClick={handleSettings}>Settings<AppSettingsAltRoundedIcon /></MenuItem>
                        <MenuItem onClick={handleLogout} css={{
                            '&:hover': {
                                background: '#da373C !important',
                            }
                        }}
                        >Signout<ExitToAppRoundedIcon /></MenuItem>
                    </div>

                </ClickAwayListener>
            </StyledPopper >)}

            {(layout === 'mobile' && Boolean(anchorEl)) && (<Drawer open={Boolean(anchorEl)} setOpen={setAnchorEl} onClose={handleClose}>
                <MenuItem onClick={handleSettings}>Settings<AppSettingsAltRoundedIcon /></MenuItem>
                <MenuItem onClick={handleLogout} css={{ '&:hover': { background: '#da373C !important', } }}>Signout<ExitToAppRoundedIcon /></MenuItem>
            </Drawer>)}



        </div >

    )
}



export default memo(MeMenu)