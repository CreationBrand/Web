
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
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
    })
}

const Player = ({ url }: any) => {

    const [isVisable, setIsVisable] = useState(false)
    const handleVisability = (visable: boolean) => setIsVisable(visable)


    useEffect(() => {
        document.querySelectorAll('iframe').forEach((iframe: any) => {
            iframe.setAttribute('sandbox', '');
        })
    }, [])

    return (<div css={C.player} onClick={(e) => e.stopPropagation()}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <VisibilitySensor onChange={handleVisability}>
                    <ReactPlayer
                        autoPlay={isVisable}
                        controls
                        url={url}
                        muted={true}
                        loop={true}
                    />
                </VisibilitySensor>
            </Suspense>
        </ErrorBoundary>
    </div>)
}


export default Player