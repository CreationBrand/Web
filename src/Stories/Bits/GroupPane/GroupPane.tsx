/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import { textBold } from "Global/Mixins";



const C = {
    container: css({
        display: 'flex',
        padding: '4px 8px 4px 8px',
        borderRadius: '16px',
        background: '#343442',
        width: 'min-content',
        gap: '8px',
        alignItems: 'center',
  
    }),
    icon: css({
        background: '#272732',
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

        <div css={C.icon}>
            <AccountTreeRoundedIcon sx={{
                fontSize: '24px',
                margin: 'auto',
                fill: '#b9bbbe',
            }} />
        </div>
        <div css={{height:'30px'}}>
            <div css={textBold('m')}>{data.title} </div>
            <div css={[C.color, { background: "#" + data.color?.toString(16) + '!important' }]} />
        </div>
    </div>
}




export default GroupPane