/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import { textBold } from "Global/Mixins";



const C = {
    container: css({
        marginTop: '16px',
        width: '100%',
    }),
    inner: css({
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',

    }),
    group: css({
        padding: '8px 8px 8px 8px',
        width:'min-content',
        background: '#272732',
        borderRadius: '16px',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
        whiteSpace: 'nowrap',
    }),

    icon: css({
        background: '#181820',
        height: '40px',
        width: '40px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    color: css({
        margin: 'auto',
        height: '4px',
        width: 'calc(100% - 8px)',
        borderRadius: '8px',
    }),
}

const GroupPane = ({ data }: any) => {



    return <div css={C.container}>
        <div css={C.inner}>
            <div css={C.group}>
                <div css={C.icon}>
                    <AccountTreeRoundedIcon sx={{
                        fontSize: '24px',
                        margin: 'auto',
                        fill: '#b9bbbe',
                    }} />
                </div>
                <div css={{ height: '30px' }}>
                    <div css={textBold('m')}>{data.title} </div>
                    <div css={[C.color, { background: "#" + data.color?.toString(16) + '!important' }]} />
                </div>
            </div>
        </div></div>
}




export default GroupPane