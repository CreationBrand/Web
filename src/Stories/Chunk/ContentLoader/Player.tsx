
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState } from 'react';
import ReactPlayer from 'react-player'
import VisibilitySensor from 'react-visibility-sensor';

const C = {
    player: css({
        borderRadius: '8px',
        width: '100%',
        // width: 'min-content',
        overflow: 'hidden',
        position: 'relative',
        '& > div': {
            width: '100% !important',
            background: '#272732',
        },
        '& > div > video': {
            backgroundColor: '#fff',
            background: '#181820 !important',
            objectFit: 'contain',
            width: '100% !important',
            height: 'auto',
            borderRadius: '8px',

        }
    })
}

const Player = ({ url }: any) => {

    const [isVisable, setIsVisable] = useState(false)
    const handleVisability = (visable: boolean) => setIsVisable(visable)

    return (<div css={C.player} onClick={(e) => e.stopPropagation()}>
        <VisibilitySensor onChange={handleVisability}>
            <ReactPlayer
                controls
                url={url}
                playing={isVisable}
                muted={true}
                loop={true}
            />
        </VisibilitySensor>
    </div>)
}


export default Player