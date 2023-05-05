/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import TurnLeftRoundedIcon from '@mui/icons-material/TurnLeftRounded';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { textLight } from 'Global/Mixins';

const C = {
    container: css({
        display: 'flex',
        color: '#b9bbbe',
    }),

}

const ShortNav = () => {


    return <div css={C.container}>

        {/* <TurnLeftRoundedIcon  sx={{ fontSize: '34px' }} /> */}

        <IconButton
            disableRipple={true}
            size="small"
            color="secondary"
            sx={{
                ':hover': { color: '#fff' },
                height: '32px',
   

            }}>
            <ArrowBackRoundedIcon
                sx={{
                    fontSize: '30px',
                }}
            />
    <div css={textLight('t')}>Return</div>
           
        </IconButton>


        {/* <div css={text}></div> */}
    </div>
}




export default ShortNav