/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconButton, MenuItem } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

// ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import { memo, useState } from 'react';
import { layoutSize } from '@/state/layout';
import Drawer from '../bits/Drawer';
import { faCaretDown, faChartLine, faFire, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { base, bg_1, bg_2, bg_3, bg_4, bg_active, bg_hover, text_1, text_2, text_3 } from '@/global/var';
import { communityFilter } from '@/state/filters';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';




const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingTop: '0px',
    width: '150px',
    backgroundColor: 'transparent',
}));

const SortMenu = ({ community_id }: any) => {


    const layout = useRecoilValue(layoutSize)
    const [anchorEl, setAnchorEl]: any = useState(null);
    const [filter, setFilter] = useRecoilState(communityFilter(community_id))


    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        if (anchorEl) anchorEl.focus();
        setAnchorEl(null);
    };



    const onChange = (e: any) => {
        setFilter(e.target.dataset.test)
    }

    return (<div>

        <div onClick={handleClick} onMouseLeave={handleClose} css={{
            background: bg_active,
            padding: '6px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            gap: '7px',
            fontWeight: 500,
            color: text_1,
            display: 'flex',
            alignItems: 'center',
        }}>

            {filter === 'BEST' && <><FontAwesomeIcon icon={faFire} /> Best</>}
            {filter === 'NEW' && <><FontAwesomeIcon icon={faNewspaper} />New</>}
            {filter === 'TOP' && <><FontAwesomeIcon icon={faChartLine} />Top</>}
            {filter === 'TOPY' && <><FontAwesomeIcon icon={faChartLine} />Top • Year</>}
            {filter === 'TOPM' && <><FontAwesomeIcon icon={faChartLine} />Top • Month</>}
            {filter === 'TOPD' && <><FontAwesomeIcon icon={faChartLine} />Top • Day</>}

            <FontAwesomeIcon icon={faCaretDown} />


            {(layout === "mobile" && Boolean(anchorEl)) && (<Drawer
                open={Boolean(anchorEl)}
                setOpen={setAnchorEl}
                onClose={handleClose}
            >
                <MenuItem data-test='BEST' selected={filter === 'BEST'} onClick={onChange}>Best<FontAwesomeIcon icon={faFire} /></MenuItem>
                <MenuItem data-test='NEW' selected={filter === 'NEW'} onClick={onChange}>New <FontAwesomeIcon icon={faNewspaper} /></MenuItem>
                <MenuItem data-test='TOP' selected={filter === 'TOP'} onClick={onChange}>Top • All Time <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                <MenuItem data-test='TOPY' selected={filter === 'TOPY'} onClick={onChange}>Top • Past Year <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                <MenuItem data-test='TOPM' selected={filter === 'TOPM'} onClick={onChange}>Top • Past Month <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                <MenuItem data-test='TOPD' selected={filter === 'TOPD'} onClick={onChange}>Top • Past Day <FontAwesomeIcon icon={faChartLine} /></MenuItem>
            </Drawer>

            )}

            {(layout === "desktop" && Boolean(anchorEl)) && (


                <StyledPopper
                    id='postMenu'
                    modifiers={[{ name: "offset", options: { offset: [0, 0] } }]}
                    open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom-start'>

                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            css={{
                                borderRadius: '8px',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                padding: '6px 8px',
                                backgroundColor: bg_1,
                            }}
                        >

                            <MenuItem data-test='BEST' onClick={onChange}>Best<FontAwesomeIcon icon={faFire} /></MenuItem>
                            <MenuItem data-test='NEW' onClick={onChange}>New <FontAwesomeIcon icon={faNewspaper} /></MenuItem>
                            <MenuItem data-test='TOP' onClick={onChange}>Top • All Time <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                            <MenuItem data-test='TOPY' onClick={onChange}>Top • Year <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                            <MenuItem data-test='TOPM' onClick={onChange}>Top • Month <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                            <MenuItem data-test='TOPD' onClick={onChange}>Top • Day <FontAwesomeIcon icon={faChartLine} /></MenuItem>
                        </div>

                    </ClickAwayListener>
                </StyledPopper >)}
        </div>

    </div >)


}



export default memo(SortMenu)



