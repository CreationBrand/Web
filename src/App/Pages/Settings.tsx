/** @jsxImportSource @emotion/react */

import Duo from "Stories/Duo"
import Paper from "Stories/Paper"
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { IconButton } from "@mui/material";
import { xsMuted } from "Stories/Text/Text";
import { Link } from "react-router-dom";



const Settings = () => {






    return <Duo>
        <Paper background="sec"


            width="100%"
            height="100%"></Paper>
        <Paper

            width="100%"
            height="100%"
            background="tri"></Paper>

<Link to="/home">
        <div css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
           
            <IconButton aria-label="back" size="large">
                <KeyboardReturnRoundedIcon />
            </IconButton>
            <div css={xsMuted}>Home</div>
      
        </div>
        </Link>
    </Duo>

}




export default Settings