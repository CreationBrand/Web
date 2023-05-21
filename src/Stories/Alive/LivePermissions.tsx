/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { IconButton, MenuItem } from "@mui/material";
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { useEffect, useState } from "react";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import WeekendIcon from '@mui/icons-material/Weekend';

import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import { textLabel } from "Global/Mixins";
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalHex, globalRoleData } from 'State/Data';
import BitSet from 'bitset';

const LivePermissions = () => {

    const [globalPerms, setGlobalPerms] = useRecoilState(globalHex)

    const globalRoles = useRecoilValue(globalRoleData)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = () => { }
    const handleHover = (event: any) => setAnchorEl(event.target)

    useEffect(() => {
        let temp = new BitSet('00000')
        for (var i = 0; i < globalRoles.length; i++) {
            temp = temp.or(new BitSet(`0x${globalRoles[i].permissions}`))
        }
        setGlobalPerms(temp)
    }, [globalRoles])


    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div onClick={(e: any) => e.stopPropagation()}>

                    <IconButton
                        onMouseEnter={handleHover}
                        {...bindHover(popupState)}
                        onClick={handleClick}
                        disableRipple={true}
                        size="small"
                        color="secondary"
                        sx={{
                            ':hover': { color: '#fff' },
                            height: '32px',
                            width: '32px',

                        }}>
                        <KeyRoundedIcon
                            sx={{
                                fontSize: '26px',
                                transform: 'rotate(90deg)',
                            }}
                        />
                    </IconButton>



                    <HoverPopover
                        {...bindPopover(popupState)}

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {Boolean(anchorEl) && <>

                            <div css={{ fontSize: '10px', padding: '6px 8px', }}>
                                <span css={textLabel('t')}>Global Perms</span>

                                <MenuItem css={{ paddingLeft: '2px', color: globalPerms.get(0) ? '#5ae334 !important' : '#eb4034 !important' }}>
                                    <EditAttributesIcon css={{ fontSize: '22px', height: '20px' }} />
                                    <span css={{ fontSize: '12px' }}>Tags</span>
                                </MenuItem>

                                <MenuItem css={{ paddingLeft: '2px', color: globalPerms.get(1) ? '#5ae334 !important' : '#eb4034 !important' }}>
                                    <AdminPanelSettingsOutlinedIcon css={{ fontSize: '22px', height: '20px' }} />
                                    <span css={{ fontSize: '12px' }}>Roles</span>
                                </MenuItem>
                                <MenuItem css={{ paddingLeft: '2px', color: globalPerms.get(2) ? '#5ae334 !important' : '#eb4034 !important' }}>
                                    <WeekendIcon css={{ fontSize: '22px', height: '20px' }} />
                                    <span css={{ fontSize: '12px' }}>Community</span>
                                </MenuItem>
                                <MenuItem css={{ paddingLeft: '2px', color: globalPerms.get(3) ? '#5ae334 !important' : '#eb4034 !important' }}>
                                    <GavelRoundedIcon css={{ fontSize: '22px', height: '20px' }} />
                                    <span css={{ fontSize: '12px' }}>Admin</span>

                                </MenuItem>
                            </div>
                        </>}
                    </HoverPopover>
                </div>
            )}
        </PopupState>



    )
}



export default LivePermissions;


export const communityRoles = {
    manage_tags: 1,
    manage_roles: 2,
    manage_community: 3,
    admin: 4,
}

export const globalRoles = {
    manage_tags: 1,
    manage_communitys: 2,
    manage_users: 3,
    manage_roles: 4,
    admin: 5,
}
