
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Ticker from '../Bits/Ticker/Ticker'
import { memo } from 'react'
import { faChartSimple, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';

const C = {
    vote: css({
        display: 'flex',
        background: '#181820',
        borderRadius: '8px',
        gap: '4px',
        width: 'min-content',
        height: '30px',
        alignItems: 'center',
        padding: '0px 8px',
        color: '#b9bbb3',
        fontSize: '14px',
        fontWeight: 'bold',
    })
}

const LiveViews = ({ value }: any) => {

    return (
        <div css={C.vote}>
            <FontAwesomeIcon icon={faChartSimple} size='xs' />
            <div css={{ height: '20px' }}>{value}</div>
        </div >
    )
}

export default memo(LiveViews)

