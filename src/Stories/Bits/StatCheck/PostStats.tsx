
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, formatDistanceStrict, intlFormat, parseISO } from 'date-fns'
import { mNormal, sNormal } from '../Text/Text'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

import NotesRoundedIcon from '@mui/icons-material/NotesRounded';


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
    }),

}

const PostStats = ({ comments, created_at, karma }: any) => {

    // console.log(comments, created_at, karma)

    return <div css={C.container}>
        <div css={C.item}>
            <WhatshotRoundedIcon sx={{ height: '16px ' }} color='secondary' />
            <div css={sNormal}>
                {(karma / ((differenceInHours(parseISO(created_at), new Date())) ^ 1.8)).toFixed(2)}
            </div>
        </div>

        <div css={C.item}>
            <CalendarMonthRoundedIcon sx={{ height: '16px ' }} color='secondary' />
            <div css={sNormal}>
                {intlFormat(parseISO(created_at), {
                    minute: 'numeric',
                    hour: 'numeric',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </div>
        </div>
        <div css={C.item}>
            <NotesRoundedIcon sx={{ height: '16px ' }} color='secondary' />
            <div css={sNormal}>
                {comments}
            </div>
        </div>
    </div>
}






export default PostStats