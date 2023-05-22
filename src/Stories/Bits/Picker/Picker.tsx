/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, {
    AutocompleteCloseReason,
    autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Button, Checkbox, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { tagData } from 'State/Data';
import { useRecoilValue } from 'recoil';
import { socketRequest } from 'Service/Socket';
import useSubscription from 'Hooks/useSubscription';


const StyledPopper = styled(Popper)(({ theme }) => ({
    borderRadius: '4px',
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    padding: '6px 8px',
    width: '180px',
    backgroundColor: '#0f0e10',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
}));


export default function Picker({ anchorEl, setAnchorEl, current, public_id, type, placement }: any) {


    const tags = useRecoilValue(tagData)
    // const updates = useSubscription(`tags:${public_id}`, current, true)

    const [value, setValue]: any = useState([]);



    useEffect(() => {
        if (!current || current.length < 1) return
        let temp: any = []
        current.forEach((elem: any) => {
            temp.push(elem.public_id)
        });
        setValue(temp)
    }, [public_id, current])


    // const handleSubmit = async () => {

    //     let strip = []

    //     for (let i = 0; i < pendingValue.length; i++) {
    //         strip.push(pendingValue[i].public_id)
    //     }

    //     await socketRequest('tag-update', { type: type, tags: strip, public_id: public_id })

    // }

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const handleTag = (e: any) => {
        if (value.indexOf(e.currentTarget.dataset.test) > -1) {
            socketRequest('tag-remove', { type: type, tag_id: e.currentTarget.dataset.test, entity_id: public_id })
        } else {
            socketRequest('tag-add', { type: type, tag_id: e.currentTarget.dataset.test, entity_id: public_id })
        }
    }

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
                    {tags.map((tag: any) =>
                        <MenuItem
                            key={tag.public_id}
                            data-test={tag.public_id}
                            onClick={handleTag}
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
