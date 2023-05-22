/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useEffect, useState } from 'react';
import { Checkbox, MenuItem, } from '@mui/material';
import { tagData } from 'State/Data';
import { useRecoilValue } from 'recoil';
import { socketRequest } from 'Service/Socket';
import { communityFlow, contentFlow } from 'State/Flow';


const StyledPopper = styled(Popper)(({ theme }) => ({
    borderRadius: '4px',
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    padding: '6px 8px',
    minWidth: '180px',
    backgroundColor: '#0f0e10',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
}));


export default function CommunityRolePicker({ anchorEl, setAnchorEl, person_id, public_id, placement, current }: any) {


    const community: any = useRecoilValue(communityFlow)
    const [value, setValue]: any = useState([]);


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
            socketRequest('roles-remove-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })
        } else {

            socketRequest('roles-add-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })

        }
    }


    if (!community.allRoles || !community) return null

    return (
        <StyledPopper
            modifiers={[
                {
                    name: "offset",
                    options: {
                        offset: [-6, 12],
                    },
                },
            ]}
            id={'picker'} open={Boolean(anchorEl)} anchorEl={anchorEl} placement={placement}>
            <ClickAwayListener onClickAway={handleClose}>
                <>
                    {community.allRoles.map((tag: any) =>
                        <MenuItem
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
                </>
            </ClickAwayListener>
        </StyledPopper>
    );
}
