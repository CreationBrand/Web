/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { Tooltip, IconButton } from '@mui/material';

const C = {
    container: css({
        marginLeft: 'auto',

    }),
}


const QuickMenu = ({active}:any) => {


    const handleClick = (e:any) => {}


    if(!active) return null

    return <div css={C.container}>
        <Tooltip title="Edit" arrow placement='top'>
            <TripOriginIcon fontSize='inherit' />

            {/* <IconButton
                size="small"
                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '14px',
                    width: '14px',
                }}>
            </IconButton> */}
        </Tooltip>



    </div>
}

export default QuickMenu