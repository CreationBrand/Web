/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import { faComment, faEnvelope, faThumbsDown, faThumbsUp, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { personFilter } from '@/state/filters';
import FilterMenu from '@/components/menu/FilterMenu';
import StyleMenu from '@/components/menu/StyleMenu';
import { bg_1, bg_3, bg_active } from '@/global/var';

const C = {
    container: css({
        width: '100%',
        margin: '12px 0px 0px 0px',
        height: '40px',
        background: bg_3,
        borderRadius: '8px',
        padding: '0px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
}

const FilterPane = () => {

    const [value, onChange] = useRecoilState(personFilter);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl]: any = useState(null);

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
        setOpen(false)
    };

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
        setOpen(true)
    };


    const handlePost = () => onChange('POST')
    const handleComment = () => onChange('COMMENT')


    return (

        <div css={C.container}>


            <div css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Button
                    onClick={handlePost}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'POST' ? bg_active : bg_3,
                        color: value === 'POST' ? '#fff' : '#d7dadc'
                    }}
                >
                    <div css={{
                        fontSize: '12px',
                    }}>Posts</div>
                </Button>

                <Button
                    onClick={handleComment}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'COMMENT' ? bg_active : bg_3,
                        color: value === 'COMMENT' ? '#fff' : '#d7dadc',
                    }}
                >
                    <div css={{ fontSize: '12px' }}>
                        Comments
                    </div>
                </Button>


            </div>



            <div css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FilterMenu />
                <StyleMenu />
            </div>
        </div>
    )
}

export default FilterPane
