
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Ticker from '../Bits/Ticker/Ticker'
import { memo } from 'react'
import { faChartSimple, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';

const C = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        width: 'min-content',
        height: '30px',
        background: '#181820',
        borderRadius: '8px',
        gap: '4px',
        padding: '0px 8px',
        color: '#b9bbb3',
    }),
    num: css({
        height: '14px',
        fontSize: '14px',
        lineHeight: '12px',
        fontWeight: 'bold',
    }),
}

const LiveViews = ({ value }: any) => {

    return (
        <div css={C.container}>
            <FontAwesomeIcon icon={faChartSimple} size='xs' />
            <span css={C.num}>{value}</span>
        </div>
    )
}

export default memo(LiveViews)

