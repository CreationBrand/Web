/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { textBold, textNormal } from 'Global/Mixins'
import { Button, Fade, Menu, MenuItem, Popover, Popper, Tooltip, Typography } from '@mui/material'
import { socketRequest } from 'Service/Socket'
import Avatar from '../Avatar/Avatar'
import { id } from 'date-fns/locale'
import HoverPopover from "material-ui-popup-state/HoverPopover";

import PopupState, { bindTrigger, bindPopover, bindHover } from 'material-ui-popup-state';
import MiniError from '../ChunkError/MiniError'


const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        width: 'min-content',
    }),

    underline: css({
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },

    }),
}

const CommunityTitle = ({ title, public_id }: any) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()


    const handleClick = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
    };

    const handleHover = (event: any) => setAnchorEl(event.target)
    const handleClose = () => setAnchorEl(null);


    // Option B: useMemo() stores the debounced callback
    const debouncedEventHandler = useMemo(
        () => debounce(handleHover, 500)
        , []);


    return (
        <>



            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <div
                            onMouseEnter={debouncedEventHandler}
                            {...bindHover(popupState)} css={C.underline}>{title}</div>


                        <HoverPopover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            {Boolean(anchorEl) && <CommunityPreview public_id={public_id} />}
                        </HoverPopover>
                    </div>
                )}
            </PopupState>



            {/* <Menu
                onClick={(e) => e.stopPropagation()}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onMouseLeave={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                sx={{
                    list: {
                        borderRadius: '16px !important',
                    },
                }}
            >
                {Boolean(anchorEl) && <CommunityPreview public_id={public_id} />}
            </Menu> */}
        </>
    )
}

export default CommunityTitle

const D = {
    container: css({
        padding: '8px',
        background: '#0f0e10',
        width: '360px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1e1e1e',
        boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%)',

    }),
}

let CommunityPreview = ({ public_id }: any) => {

    let [data, setData]: any = useState(null)


    // useEffect(() => {
    //     (async () => {
    //         let temp: any = await socketRequest('community', { community_id: public_id })
    //         setData(temp.community)
    //         console.log(temp)

    //     })()
    // }, [public_id])

    if (!data) return <div css={[D.container, {width: '240px'}]}><MiniError variant='loading' /></div>


    return <div css={D.container}>

        <div css={{
            padding: '12px 12px 0px 12px',
            display: 'flex',
            gap: '12px',
            lineHeight: '20px',
            alignItems: 'center',
        }}>
            <Avatar size="large" public_id={public_id} />
            <div css={[textBold("l"), { height: '20px' }]}>{data.title}</div>
        </div>

        {data.description !== 'undefined' && <div css={{
            padding: '12px 12px 0px 12px',
            display: 'flex',
            gap: '12px',
            lineHeight: '20px',
            alignItems: 'center',
        }}>
            <div css={[textNormal("s"), { height: '20px', color: '#d7dadc' }]}>{data.description}</div>
        </div>
        }

        <div css={{
            marginTop: '16px',
            borderTop: '1px solid #3d4065',
            padding: '12px 12px 0px 12px',
            display: 'flex',
            gap: '22px',
        }}>

            <div>
                <div css={[textBold("s"), { height: '20px', }]}>
                    <span css={{
                        display: ' inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#c4c9ce',
                        marginRight: '4px',
                    }} />

                    {data.subscribers}</div>
                <div css={[textNormal("t"), { height: '20px', color: '#a298f7' }]}>Members</div>
            </div>

            <div>

                <div css={[textBold("s"), { height: '20px', }]}>

                    <span css={{
                        display: ' inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#43b581',
                        marginRight: '4px',
                    }} />{data.subscribers}</div>

                <div css={[textNormal("t"), { height: '20px', color: '#a298f7' }]}>Online</div>
            </div>
        </div>



    </div>
}






type Fnc = (...args: any[]) => void;

// default 300ms delay
export function debounce<F extends Fnc>(func: F, delay = 300) {
    type Args = F extends (...args: infer P) => void ? P : never;
    let timeout: any;
    return function (this: any, ...args: Args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}