
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
import { faChartSimple, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import { bg_2, text_3 } from '@/global/var';

const C = {
    container: css({
        display: 'flex',
        width: 'min-content',
        fontSize: '14px',
        background: bg_2,
        borderRadius: '12px',
        gap: '4px',
        padding: '10px 10px',
        color: text_3,
        fontWeight: 'bold',
        lineHeight: '10px',
    })
}
const LiveViews = ({ value }: any) => {

    return (
        <div css={C.container}>
            <FontAwesomeIcon icon={faChartSimple} size='xs' />
            {value}
        </div>
    )
}

export default memo(LiveViews)

