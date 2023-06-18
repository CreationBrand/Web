/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { ClickAwayListener, IconButton, MenuItem, Popper, styled } from '@mui/material';
import { memo, useState } from 'react';

import RoleMenu from './RoleMenu';
import TagMenu from './TagMenu';

// icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { useRecoilValue } from 'recoil';
import { contentFlow } from 'State/Flow';
import { textBold, textLight } from 'Global/Mixins';
import { personData } from 'State/Data';
import Avatar from 'Stories/Bits/Avatar/Avatar';
import { logoutCognito } from 'Service/Cognito';
import { useNavigate } from 'react-router-dom';


//ICONS
import AppSettingsAltRoundedIcon from '@mui/icons-material/AppSettingsAltRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';


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
        height: '56px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        background: '#272732',
        borderRadius: '8px',
        justifyContent: 'flex-start',
        paddingLeft: '8px',
        paddingRight: '8px',
        alignItems: 'center',
    }),

    content: css({
        width: 'calc(100% - 56px)',
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


const CommentMenu = ({ person_id, comment_id, tags, global_roles, community_roles }: any) => {

    const person = useRecoilValue(personData)
    const [anchorEl, setAnchorEl]: any = useState(null);
    let content = useRecoilValue(contentFlow)
    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => logoutCognito()
    const handleSettings = () => {
        navigate('/settings')
        handleClose()
    }



    return (

        <div id="person"
            onMouseLeave={handleClose}
            css={C.container} onClick={handleClick}>

            <Avatar public_id={person.public_id} size="medium" />

            <div css={C.content}>
                <div css={textBold('m')}>{person.nickname}</div>
                <div css={textLight('t')}>@{person.username}</div>
            </div>


            {Boolean(anchorEl) && (


                <StyledPopper
                    id='postMenu'
                    modifiers={[{ name: "offset", options: { offset: [-8, -4] } }]}
                    open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom'>

                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            css={{
                                width: '216px',
                                borderRadius: '4px',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                padding: '6px 8px',
                                backgroundColor: '#0f0e10',
                            }}
                        >

                            <MenuItem onClick={handleSettings}>Settings<AppSettingsAltRoundedIcon /></MenuItem>
                            <MenuItem onClick={handleLogout} css={{
                                '&:hover': {
                                    background: '#da373C !important',
                                }
                            }}
                            >Signout<ExitToAppRoundedIcon/></MenuItem>
                        </div>

                    </ClickAwayListener>
                </StyledPopper >)}



        </div>

    )
}



export default memo(CommentMenu)