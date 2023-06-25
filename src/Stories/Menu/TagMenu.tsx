/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import { memo, useEffect, useState } from 'react';
import { Checkbox, MenuItem } from '@mui/material';
import { tagData } from 'State/Data';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { socketRequest } from 'Service/Socket';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { canManageTags } from 'Service/Rbac';
import { communityFlow } from 'State/Flow';
import { commentSync } from 'State/commentAtoms';
import { postSync } from 'State/postAtoms';
import useCommunityData from 'Hooks/Pull/useCommunityData';


const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingRight: '12px',
    width: '160px',
    backgroundColor: 'transparent',
}));


const TagMenu = ({ current, public_id, type, community_id }: any) => {

    const [anchorEl, setAnchorEl]: any = useState(null)
    const [value, setValue]: any = useState([]);
    const tags = useRecoilValue(tagData)

    const community: any = useCommunityData(community_id)

    const updater = useSetRecoilState(type === 'post' ? postSync(public_id) : commentSync(public_id))


    useEffect(() => {
        if (!current || current.length < 1) return
        let temp: any = []
       
        try {
            current?.forEach((elem: any) => {
                temp.push(elem?.public_id)
            });
        } catch (e) {
            console.log(e)
        }
        setValue(temp)
    }, [public_id, current])

    const handleClose = () => {
        if (anchorEl) anchorEl.focus();
        setAnchorEl(null);
    };
    const open = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    };

    const handleTag = (e: any) => {
        if (value.indexOf(e.currentTarget.dataset.test) > -1) {
            socketRequest('tag-remove', { type: type, tag_id: e.currentTarget.dataset.test, entity_id: public_id })
            updater((old: any) => {
                return {
                    ...old,
                    tags: old.tags.filter((elem: any) => elem.public_id !== e.currentTarget.dataset.test)
                }
            })
            handleClose()
        } else {
            updater((old: any) => {
                let temp = old?.tags?.length > 0 ? old.tags : []
                return {
                    ...old,
                    tags: [...temp, tags.find((elem: any) => elem.public_id === e.currentTarget.dataset.test)]

                }
            })
            socketRequest('tag-add', { type: type, tag_id: e.currentTarget.dataset.test, entity_id: public_id })
            handleClose()
        }
    }

    if (!community || !canManageTags([community.communityHex])) return null

    return (

        <MenuItem
            onMouseEnter={open}
            onMouseLeave={handleClose}
        >

            <StyledPopper
                modifiers={[{ name: "offset", options: { offset: [-8, -2] } }]}
                id={'tagsMenu'} placement={'left-start'}
                open={Boolean(anchorEl)} anchorEl={anchorEl}>

                <div
                    css={{
                        borderRadius: '4px',
                        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                        padding: '6px 8px',
                        backgroundColor: '#0f0e10',
                    }}
                >
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
                </div>
            </StyledPopper>

            Tags <StyleRoundedIcon />
        </MenuItem>
    );
}



export default memo(TagMenu)