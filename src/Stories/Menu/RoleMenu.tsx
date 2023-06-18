/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';

import { useEffect, useState } from 'react';
import { Checkbox, MenuItem, } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { socketRequest } from 'Service/Socket';
import { communityFlow } from 'State/Flow';

import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { canManageCommunity } from 'Service/Rbac';
import { commentSync } from 'State/commentAtoms';
import { postSync } from 'State/postAtoms';

const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingRight: '12px',
    width: '160px',
    backgroundColor: 'transparent',
}));


export default function RoleMenu({ current, person_id, public_id, type }: any) {

    const updater = useSetRecoilState(type === 'post' ? postSync(public_id) : commentSync(public_id))

    const community: any = useRecoilValue(communityFlow)
    const [value, setValue]: any = useState([]);
    const [anchorEl, setAnchorEl]: any = useState(null)

    useEffect(() => {
        if (!current || current < 1) return
        let temp: any = []
        current.forEach((elem: any) => {
            temp.push(elem.public_id)
        });
        setValue(temp)
    }, [public_id, current])

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const handleClick = (e: any) => {
        if (value.indexOf(e.currentTarget.dataset.test) > -1) {
            console.log(e.currentTarget.dataset.test)
            updater((old: any) => {
                console.log(old)
                return {
                    ...old,
                    community_roles: old.community_roles.filter((elem: any) => elem.public_id !== e.currentTarget.dataset.test)
                }
            })
            socketRequest('roles-remove-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })
            handleClose()
        } else {
            updater((old: any) => {
                let temp = old?.community_roles?.length > 0 ? old.community_roles : []
                return {
                    ...old,
                    community_roles: [...temp, community.allRoles.find((elem: any) => elem.public_id === e.currentTarget.dataset.test)]
                }
            })
            socketRequest('roles-add-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })
            handleClose()
        }
    }

    const open = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    };


    if (!community.allRoles || !canManageCommunity(community.roleHex)) return null

    return (

        <MenuItem
            onMouseEnter={open}
            onMouseLeave={handleClose}
        >

            {/* POPPER */}
            <StyledPopper
                placement={'left-start'}
                modifiers={[{ name: "offset", options: { offset: [-6, -2] } }]}
                id={'roleMenu'} open={Boolean(anchorEl)} anchorEl={anchorEl} >

                <div
                    css={{
                        borderRadius: '4px',
                        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                        padding: '6px 8px',
                        backgroundColor: '#0f0e10',
                    }}
                >
                    {community.allRoles.map((tag: any) =>
                        <MenuItem
                            disabled={tag.base}
                            key={tag.public_id}
                            data-test={tag.public_id}
                            onClick={handleClick}
                        >
                            <div
                                css={{
                                    width: '14px',
                                    height: '14px',
                                    flexShrink: 0,
                                    borderRadius: '3px',
                                    backgroundColor: "#" + tag?.color?.toString(16),
                                }} />
                            {tag.title}

                            <Checkbox
                                checked={value.indexOf(tag.public_id) > -1}
                                size='small'
                                sx={{
                                    marginLeft: 'auto',
                                    height: '14px',
                                    width: '14px',
                                    '&.Mui-checked': {
                                        color: "#" + tag?.color?.toString(16),
                                    },
                                }} />
                        </MenuItem>)}
                </div>


            </StyledPopper >


            Roles <EditAttributesIcon />
        </MenuItem>

    );
}
