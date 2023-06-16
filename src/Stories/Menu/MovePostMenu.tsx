/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';

import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { socketRequest } from 'Service/Socket';
import { communityFlow, contentFlow } from 'State/Flow';

import { canMovePost } from 'Service/Rbac';
import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import { communityListData } from 'State/Data';
import { postList, postSync, resetAllAtoms } from "State/postAtoms";
import { Visibility } from '@mui/icons-material';


const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingRight: '12px',
    width: '200px',
    backgroundColor: 'transparent',
}));


export default function MovePostMenu({ post_id }: any) {

    const community: any = useRecoilValue(communityFlow)
    const communityList = useRecoilValue(communityListData)
    let updateSync = useSetRecoilState(postSync(post_id))

    const [value, setValue]: any = useState([]);

    const [anchorEl, setAnchorEl]: any = useState(null)


    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const handleClick = async (e: any) => {

        let req: any = await socketRequest('unsetPost', { post_id: post_id, community_id: e.currentTarget.dataset.test })
        
        updateSync((prevState: any) => ({
            ...prevState,
            visibility: false,
        }));

        if (req.status === 'ok') handleClose()

        // if (value.indexOf(e.currentTarget.dataset.test) > -1) {
        //     socketRequest('roles-remove-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })
        //     handleClose()
        // } else {
        //     socketRequest('roles-add-person', { public_id: public_id, role_id: e.currentTarget.dataset.test, person_id: person_id, community_id: community.public_id })
        //     handleClose()
        // }
    }

    const open = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    };


    if (!community.allRoles || !canMovePost(community.roleHex)) return null

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
                        maxHeight: '300px',
                        overflowY: 'auto',
                    }}
                >
                    {communityList.map((tag: any) =>
                        <MenuItem
                            key={tag.public_id}
                            data-test={tag.public_id}
                            onClick={handleClick}
                        >
                            {tag.title}
                        </MenuItem>)}
                </div>


            </StyledPopper >


            Move Post <MoveDownRoundedIcon />
        </MenuItem>

    );
}
