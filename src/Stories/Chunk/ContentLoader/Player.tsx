
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Walk from 'Stories/Bits/ChunkError/Walk';
import { Block, block } from 'million';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
    }), error: css({
        width: '100%',
        height: '80px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',
    }),
}

const Player = ({ url }: any) => {

    const [isVisable, setIsVisable] = useState(false)
    const handleVisability = (visable: boolean) => setIsVisable(visable)
    const [error, setError] = useState(false)
    const handleError = () => setError(true)

    useEffect(() => {
        document.querySelectorAll('iframe').forEach((iframe: any) => {
            iframe.setAttribute('sandbox', '');
        })
    }, [])

    if (error) return <div css={C.error}>
        <Walk variant='error' />
    </div>


    return (<div css={C.player} onClick={(e) => e.stopPropagation()}>

        <VisibilitySensor onChange={handleVisability}>
            <ReactPlayer
                onError={handleError}
                playing={isVisable}
                controls
                url={url}
                muted={true}
                loop={true}
            />
        </VisibilitySensor>

    </div>)
}


export default Player