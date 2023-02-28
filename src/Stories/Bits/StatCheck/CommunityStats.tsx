
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceStrict, intlFormat, parseISO } from 'date-fns'
import { mNormal, sNormal } from '../Text/Text'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


const C = {
    container: css({
        width: '100%',
        display: 'flex',
        maxHeight: '32px',
        height: '32px',
        marginTop: '8px',
        gap: '8px',
        marginBottom: '8px',
    }),
    item: css({
        width: 'min-content',
        background: '#343442',
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        whiteSpace: 'nowrap',
        // justifyContent: 'center',
    }),

}

const CommunityStats = ({ subscribers, created_at, isPublic }: any) => {

    // console.log(comments, created_at, karma)

    return <div css={C.container}>
        <div css={C.item}>
            <div css={sNormal}>
                <span css={{ fontWeight: 700, }}>{subscribers} </span>
                Members
            </div>
        </div>

        <div css={C.item}>
            <CalendarMonthRoundedIcon sx={{ height: '16px ' }} color='secondary' />
            <div css={sNormal}>
                Created: {" "}

                {intlFormat(parseISO(created_at), {
                    day: 'numeric',
                    year: 'numeric',
                    month: 'numeric',
                })}
            </div>
        </div>
        <div css={C.item}>
            <div css={sNormal}>
                Public: {" "}
            </div>
            {isPublic ? <VisibilityRoundedIcon sx={{ height: '16px', marginTop: '2px' }} color='secondary' /> : <VisibilityOffRoundedIcon sx={{ height: '16px ' }} color='secondary' />}

        </div>
    </div>
}






export default CommunityStats

