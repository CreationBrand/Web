/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Avatar, IconButton, Tooltip, Badge } from "@mui/material"
import theme from "Global/Theme"
import { activeable, hoverable } from "Mixins/Mixins"
import { person } from "State/Types"
import { smBold, xsMuted } from "Stories/Text/Text"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom"



const C = {
    container: css({
        width: '100%',
        display: 'flex',
        padding: theme.spacing(2),
        justifyContent: 'space-between',
        alignItems: 'center',
    }),
    person: css({
        height: '40px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        padding: theme.spacing(1),
        width: '60%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRadius: '4px',
    }),
    button: css({
        borderRadius: '4px',
    }),
}

const Status = (props: person) => {

    return <div css={[C.container]}>
        <div css={[C.person, hoverable('sec'), activeable('sec')]}>

            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color='success'
                sx={{ '& .MuiBadge-badge': { border: '2px solid #gray' } }}
            >
                <Avatar sx={{ width: 32, height: 32 }} />
            </Badge>

            <div>
                <div css={smBold}>{props.nickname}</div>
                <div css={xsMuted}>@{props.username}</div>
            </div>
        </div>



        <Tooltip title="Settings" arrow>
        <Link to="/settings">
            <IconButton
                size="small"

                color="secondary" sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                }}>
                <SettingsOutlinedIcon
                    fontSize="small"
                />
            </IconButton>
           </Link>
        </Tooltip>
    </div>
}

export default Status
