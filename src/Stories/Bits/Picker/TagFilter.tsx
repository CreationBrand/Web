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
import { Button, Checkbox, MenuItem, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { tagData } from 'State/Data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketRequest } from 'Service/Socket';
import useSubscription from 'Hooks/useSubscription';
import { filterFlow } from 'State/Flow';
import { textLabel } from 'Global/Mixins';
import theme from 'Global/Theme';


const StyledPopper = styled(Popper)(({ theme }) => ({
    borderRadius: '4px',
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    padding: '6px 8px',
    width: '200px',
    backgroundColor: '#0f0e10',
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
}));


export default function TagFilter({ anchorEl, onClose }: any) {

    const [tags, setTags] = useRecoilState(tagData)
    const [filter, setFilter] = useRecoilState(filterFlow)

    useEffect(() => {

        (async () => {
            if (tags.length === 0) {
                let res:any = await socketRequest('tags', {})
                setTags(res.tags)
            }

        })()
    }, [tags])




    const handleTag = (e: any) => {
        if (filter.indexOf(e.currentTarget.dataset.test) > -1) {
            setFilter((prev: any) => prev.filter((_value: any, index: any) => index !== filter.indexOf(e.currentTarget.dataset.test)));
        } else {
            setFilter([...filter, e.currentTarget.dataset.test])
        }
    }

    return (
        <ClickAwayListener onClickAway={onClose}>

            <StyledPopper
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 12],
                        },
                    },
                ]}
                id={'filter'} open={Boolean(anchorEl)} anchorEl={anchorEl} placement={'left-end'}>

                <>
                    <div css={[textLabel('s'), { margin: '8px 0px 8px 14px' }]}>Filter Content</div>

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

                            <Switch
                                checked={!Boolean(filter.indexOf(tag.public_id) > -1)}
                                size='small'
                                sx={{
                                    marginLeft: 'auto',
                                    '& .MuiSwitch-switchBase': {
                                        margin: 0.5,
                                        transitionDuration: '300ms',
                                        '&.Mui-checked': {
                                            transform: 'translateX(16px)',
                                            color: '#fff',
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: '#2ECA45',
                                                opacity: 1,
                                            },
                                        },
                                    },
                                    '& .MuiSwitch-thumb': {
                                        boxSizing: 'border-box',
                                        width: 12,
                                        height: 12,
                                    },
                                    '& .MuiSwitch-track': {
                                        borderRadius: '8px',
                                        backgroundColor: '#c72a4e',
                                    }
                                }}
                            />
                        </MenuItem>)}
                </>
            </StyledPopper>
        </ClickAwayListener >

    );
}





