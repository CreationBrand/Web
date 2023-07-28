// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'

// import { styled } from '@mui/material/styles';
// import Popper from '@mui/material/Popper';
// import ClickAwayListener from '@mui/material/ClickAwayListener';

// import { useState } from 'react';
// import { IconButton, MenuItem, Switch, } from '@mui/material';
// import { useRecoilState } from 'recoil';


// import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
// import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
// import { tagData } from '@/state/data';
// import { filterFlow } from '@/state/flow';

// const StyledPopper = styled(Popper)(({ theme }) => ({
//     borderRadius: '4px',
//     zIndex: '2000',
//     fontSize: 13,
//     color: '#f2f3f5',
//     padding: '6px 8px',
//     width: '200px',
//     backgroundColor: '#0f0e10',
//     boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
// }));


// export default function FilterMenu() {

//     const [tags, setTags] = useRecoilState(tagData)
//     const [filter, setFilter] = useRecoilState(filterFlow)
//     const [anchorEl, setAnchorEl]: any = useState(null);


//     const handleTag = (e: any) => {
//         if (filter.indexOf(e.currentTarget.dataset.test) > -1) {
//             setFilter((prev: any) => prev.filter((_value: any, index: any) => index !== filter.indexOf(e.currentTarget.dataset.test)));
//         } else {
//             setFilter([...filter, e.currentTarget.dataset.test])
//         }
//     }


//     const close = () => {
//         if (anchorEl) anchorEl.focus();
//         setAnchorEl(null);

//     };

//     const open = (e: any) => {
//         e.stopPropagation()
//         e.preventDefault()
//         setAnchorEl(e.currentTarget)
//     }




//     return (

//         <>

//             <IconButton
//                 onClick={open}
//                 size="small"
//                 color="secondary" sx={{
//                     borderRadius: '4px',
//                     height: '32px',
//                     width: '32px',
//                 }}>
//                 <StyleRoundedIcon
//                     sx={{ fontSize: '22px' }} />
//             </IconButton>



//             <ClickAwayListener onClickAway={close}>
//                 <StyledPopper
//                     onMouseLeave={close}
//                     modifiers={[
//                         {
//                             name: "offset",
//                             options: {
//                                 offset: [0, 12],
//                             },
//                         },
//                     ]}
//                     id={'filter'} open={Boolean(anchorEl)} anchorEl={anchorEl} >

//                     <div >
//                         <div css={{
//                             textAlign: 'center',
//                             margin: '8px'
//                         }}>Filter Content</div>
//                         {tags.map((tag: any) =>
//                             <MenuItem
//                                 key={tag.public_id}
//                                 data-test={tag.public_id}
//                                 onClick={handleTag}
//                             >
//                                 <div
//                                     css={{
//                                         width: '14px',
//                                         height: '14px',
//                                         flexShrink: 0,
//                                         borderRadius: '3px',
//                                         backgroundColor: "#" + tag?.color?.toString(16),
//                                     }} />
//                                 {tag.title}

//                                 <Switch
//                                     checked={!Boolean(filter.indexOf(tag.public_id) > -1)}
//                                     size='small'
//                                     sx={{
//                                         marginLeft: 'auto',
//                                         '& .MuiSwitch-switchBase': {
//                                             margin: 0.5,
//                                             transitionDuration: '300ms',
//                                             '&.Mui-checked': {
//                                                 transform: 'translateX(16px)',
//                                                 color: '#fff',
//                                                 '& + .MuiSwitch-track': {
//                                                     backgroundColor: '#2ECA45',
//                                                     opacity: 1,
//                                                 },
//                                             },
//                                         },
//                                         '& .MuiSwitch-thumb': {
//                                             boxSizing: 'border-box',
//                                             width: 12,
//                                             height: 12,
//                                         },
//                                         '& .MuiSwitch-track': {
//                                             borderRadius: '8px',
//                                             backgroundColor: '#c72a4e',
//                                         }
//                                     }}
//                                 />
//                             </MenuItem>)}
//                     </div>
//                 </StyledPopper>

//             </ClickAwayListener >
//         </>
//     );
// }



/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import StyleRoundedIcon from '@mui/icons-material/StyleRounded';

import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconButton, MenuItem, Switch } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

// ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { memo, useState } from 'react';

import Drawer from '../bits/Drawer';
import { contentFlow, filterFlow } from '@/state/flow';
import { layoutSize } from '@/state/layout';
import { bg_1 } from '@/global/var';
import { tagData } from '@/state/data';
import { iconButton } from '@/global/mixins';





const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: '2000',
    fontSize: 13,
    color: '#f2f3f5',
    paddingTop: '12px',
    width: '165px',
    backgroundColor: 'transparent',
}));


const PostMenu = () => {


    const layout = useRecoilValue(layoutSize)
    const [anchorEl, setAnchorEl]: any = useState(null);

    const [tags, setTags] = useRecoilState(tagData)
    const [filter, setFilter] = useRecoilState(filterFlow)


    const handleTag = (e: any) => {
        if (filter.indexOf(e.currentTarget.dataset.test) > -1) {
            setFilter((prev: any) => prev.filter((_value: any, index: any) => index !== filter.indexOf(e.currentTarget.dataset.test)));
        } else {
            setFilter([...filter, e.currentTarget.dataset.test])
        }
    }



    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        if (anchorEl) anchorEl.focus();
        setAnchorEl(null);
    };





    return (<div onClick={(e) => e.stopPropagation()}>

        <div css={iconButton}
            onClick={handleClick}
            onMouseLeave={handleClose}
        >
            <StyleRoundedIcon sx={{ fontSize: 20, marginBottom: '1px' }} />


            {(layout === "mobile" && Boolean(anchorEl)) && (<Drawer
                open={Boolean(anchorEl)}
                setOpen={setAnchorEl}
                onClose={handleClose}
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
                                borderRadius: '4px',
                                backgroundColor: "#" + tag?.color?.toString(16),
                            }} />
                        {tag.title}

                        <Switch
                            checked={!Boolean(filter.indexOf(tag.public_id) > -1)}
                            size='small'
                            sx={{
                                marginLeft: 'auto',
                                width: '36px',
                            }}
                        />
                    </MenuItem>)}

            </Drawer>

            )}

            {(layout === "desktop" && Boolean(anchorEl)) && (


                <StyledPopper
                    id='postMenu'
                    modifiers={[{ name: "offset", options: { offset: [0, -8] } }]}
                    open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom-end'>

                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            css={{
                                borderRadius: '8px',
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                padding: '6px 8px',
                                backgroundColor: bg_1,
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
                                            borderRadius: '4px',
                                            backgroundColor: "#" + tag?.color?.toString(16),
                                        }} />
                                    {tag.title}

                                    <Switch
                                        checked={!Boolean(filter.indexOf(tag.public_id) > -1)}
                                        size='small'
                                        sx={{
                                            marginLeft: 'auto',
                                            width: '36px',
                                        }}
                                    // sx={{
                                    //     marginLeft: 'auto',
                                    //     '& .MuiSwitch-switchBase': {
                                    //         margin: 0.5,
                                    //         transitionDuration: '300ms',
                                    //         '&.Mui-checked': {
                                    //             transform: 'translateX(16px)',
                                    //             color: '#fff',
                                    //             '& + .MuiSwitch-track': {
                                    //                 backgroundColor: '#2ECA45',
                                    //                 opacity: 1,
                                    //             },
                                    //         },
                                    //     },
                                    //     '& .MuiSwitch-thumb': {
                                    //         boxSizing: 'border-box',
                                    //         width: 12,
                                    //         height: 12,
                                    //     },
                                    //     '& .MuiSwitch-track': {
                                    //         borderRadius: '8px',
                                    //         backgroundColor: '#c72a4e',
                                    //     }
                                    // }}
                                    />
                                </MenuItem>)}

                        </div>

                    </ClickAwayListener>
                </StyledPopper >)}

        </div>

    </div >)


}



export default memo(PostMenu)




