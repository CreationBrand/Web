/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded'
import { Button, Menu } from '@mui/material'
import { sMuted } from 'Stories/Bits/Text/Text'
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import { faAddressCard, faChartLine, faFire, faLayerGroup, faMessage, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import TagFilter from 'Stories/Bits/Picker/TagFilter'
import WeekendRoundedIcon from '@mui/icons-material/WeekendRounded';

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

const SearchPane = ({ value, onChange }: any) => {

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


    const handleHot = () => onChange('post')
    const handleNew = () => onChange('person')
    const handleTop = () => onChange('community')

    return (

        <div css={C.container}>
            <div css={C.inner}>
                <Button
                    onClick={handleHot}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{

                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'post' ? '#181820' : '',
                        color: value === 'post' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faNewspaper} />
                    <div css={{

                        fontSize: '12px',
                    }}>Posts</div>
                </Button>

                <Button
                    onClick={handleTop}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'community' ? '#181820' : '',
                        color: value === 'community' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <div css={{
                        fontSize: '12px',
                    }}>Communities</div>
                </Button>

                {/* <Button
                    onClick={handleNew}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'NEW' ? '#181820' : '',
                        color: value === 'NEW' ? '#fff' : '#d7dadc'

                    }}
                >
                    <FontAwesomeIcon icon={faMessage} />
                    <div css={{
                        fontSize: '12px',
                    }}>Commments</div>
                </Button> */}


                <Button
                    onClick={handleNew}
                    variant="text"
                    size="small"
                    color="secondary"
                    sx={{
                        gap: '6px',
                        borderRadius: '8px',
                        padding: '4px 12px 4px 12px',
                        background: value === 'person' ? '#181820' : '',
                        color: value === 'person' ? '#fff' : '#d7dadc'

                    }}
                >
                    <FontAwesomeIcon icon={faAddressCard} />                    <div css={{
                        fontSize: '12px',
                    }}>People</div>
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




                {open && <TagFilter anchorEl={anchorEl} onClose={handleClose} />}



            </div>
        </div>
    )
}

export default SearchPane 
