/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded'
import { Button, Menu } from '@mui/material'
import { sMuted } from 'Stories/Bits/Text/Text'
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import { faChartLine, faComment, faEnvelope, faFire, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import TagFilter from 'Stories/Bits/Picker/TagFilter'
import { useRecoilState } from 'recoil'
import { personFilter } from 'State/filterAtoms'

const C = {
    container: css({
        width: '100%',
        padding: '16px 2px 0px 0px',

    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        height: '42px',
        background: '#272732',
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        maxWidth: '800px',
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'noto sans',
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
            <div css={C.inner}>
                <Button
                    onClick={handlePost}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'POST' ? '#181820' : '',
                        color: value === 'POST' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div css={{

                        fontSize: '12px',
                    }}>POSTS</div>
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
                        background: value === 'COMMENT' ? '#181820' : '',
                        color: value === 'COMMENT' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faComment} />
                    <div css={{ fontSize: '12px' }}>
                        COMMENTS
                    </div>
                </Button>



                <Button
                    onClick={handleClick}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        minWidth: '32px',
                        marginLeft: 'auto',
                        gap: '6px',
                        borderRadius: '8px',
                    }}
                >
                    <AutoAwesomeMosaicRoundedIcon />
                </Button>


                {/* {open && <TagFilter anchorEl={anchorEl} onClose={handleClose} />} */}


            </div>
        </div>
    )
}

export default FilterPane
