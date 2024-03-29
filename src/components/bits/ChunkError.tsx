/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import VisibilitySensor from 'react-visibility-sensor';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';


const C = {
    container: css({
        height: '100%',
        minHeight: '220px',
        width: '100%',
        // paddingTop: '40px',
        margin: 'auto 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'pan-y',

    }),
    inner: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
        width: '100%',
    }),
    float: css({
        height: '80px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        color: '#d7dadc',
        fontSize: '12px',
        fontWeight: '600',
        // border:'1px solid #fff',
    }),
}



let colors: any = {
    error: '#fb4b4b',
    loading: '#4b77fb',
    end: '#fbb24b',
    connected: '#51fb4b',
    disconnected: '#fb8c4b',

}


const ChunkError = ({ variant, onLoad, end, reset }: any) => {


    const handleVisibility = (isVisible: boolean) => {
        if (onLoad && !end) onLoad()
    }
    const retry = () => {
        try {
            reset()
        } catch (e) { }
    }



    return (

        <div css={C.container} key={'chunckerror'}>
            <VisibilitySensor onChange={handleVisibility}>

                <div css={C.inner}>

                    <div css={C.float}>

                        <div css={{ fontWeight: '400', letterSpacing: '1px', }}>
                            {variant === 'error' && 'Something went wrong...'}
                            {variant === 'loading' && 'Loading'}
                            {variant === 'end' && <div css={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: '20px',
                            }}>

                                <FontAwesomeIcon icon={faFolderOpen} css={{fontSize:'32px'}} />
                                <div> Nothing else to load...</div>

                                <Button
                                    onMouseDown={retry}
                                    sx={{
                                        display: 'inline-flex',
                                        whiteSpace: ' nowrap',
                                        borderRadius: '12px',
                                        background: '#6858f2',
                                        height: '32px',
                                        // width: '100%',
                                        marginRight: '8px',
                                        fontSize: '12px',
                                        lineHeight: '12px !important',
                                        fontWeight: '600',
                                    }}
                                    variant="contained" disableElevation>
                                    Refresh
                                </Button>
                            </div>}
                            {variant === 'connected' && 'Connected!'}
                            {variant === 'disconnected' && 'Disconnected...'}
                        </div>
                    </div>

                </div>

            </VisibilitySensor >
        </div>


    )
}

export default memo(ChunkError)
