/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import { faChartLine, faFire, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { postFilter } from '@/state/filters';

const C = {
    container: css({
        width: '100%',
        padding: '16px 0px 0px 0px',

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
    }),
}

const FilterPane = () => {

    const [value, onChange] = useRecoilState(postFilter)
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


    const handleHot = () => onChange('HOT')
    const handleNew = () => onChange('NEW')
    const handleTop = () => onChange('TOP')

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
                        background: value === 'HOT' ? '#181820' : '',
                        color: value === 'HOT' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faFire} />
                    <div css={{

                        fontSize: '12px',
                    }}>BEST</div>
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
                        background: value === 'TOP' ? '#181820' : '',
                        color: value === 'TOP' ? '#fff' : '#d7dadc'
                    }}
                >
                    <FontAwesomeIcon icon={faChartLine} />
                    <div css={{

                        fontSize: '12px',
                    }}>TOP</div>
                </Button>

                <Button
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
                    <FontAwesomeIcon icon={faNewspaper} />
                    <div css={{

                        fontSize: '12px',
                    }}>NEW</div>
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

                {/* <Menu
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: '4px !important',
                            background: '#0f0e10 !important',
                            padding: '6px 8px',
                        },
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <TagFilter />
                </Menu> */}

            </div>
        </div>
    )
}

export default FilterPane
