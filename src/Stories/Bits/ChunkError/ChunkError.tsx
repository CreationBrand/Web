/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { textNormal } from 'Global/Mixins'
import { socketFlow } from 'State/Flow';
import { memo, } from 'react';
import { useRecoilValue } from 'recoil';
import VisibilitySensor from 'react-visibility-sensor';


const C = {
    container: css({
        height: '100%',
        minHeight: '420px',
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
        // border:'1px solid #fff',
    }),
    "@keyframes gradient": {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" }
    }


}

const ChunkError = ({ variant, onLoad, end, refa }: any) => {

    const socket = useRecoilValue(socketFlow)

    const handleVisibility = (isVisible: boolean) => {
        if (onLoad && !end) onLoad()
    }


    let colors: any = {
        error: '#fb4b4b',
        loading: '#4b77fb',
        end: '#fbb24b',
        connected: '#51fb4b',
        disconnected: '#fb8c4b',

    }

    if (socket === 'error') variant = 'error'


    return (
        <VisibilitySensor onChange={handleVisibility}>

            <div ref={refa} css={C.container} key={'chunckerror'}>
                <div css={C.inner}>

                    <div css={C.float}>

                        {/* <svg
                            width={64}
                            height={65}
                            viewBox="0 0 64 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            css={{
                                fill: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                            }}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.286 0H9.143v9.25h9.143V0zm9.143 9.25h-9.143v18.5h36.571V18.5h-9.143V9.25h-9.143v9.25H27.43V9.25zM9.143 18.5h9.143v9.25H9.143V18.5zm36.571 46.25V55.5h9.143v-9.25H18.286v18.5h9.143V55.5h9.142v9.25h9.143zM18.286 37v9.25H0v-18.5h18.286V37zm9.143 0h-9.143v9.25H64v-18.5H45.714V37h-9.142v-9.25h-9.143V37zM45.714 0h9.143v9.25h-9.143V0zM9.143 46.25h9.143v9.25H9.143v-9.25z"
                                fill="#fff"
                            />
                        </svg> */}

                

                    <div css={[textNormal('t'), { fontWeight: '400', letterSpacing: '1px', }]}>
                        {variant === 'error' && 'Something went wrong...'}
                        {variant === 'loading' && 'Loading'}
                        {variant === 'end' && 'Nothing else to load...'}
                        {variant === 'connected' && 'Connected!'}
                        {variant === 'disconnected' && 'Disconnected...'}
                    </div>
                    </div>

                </div>

            </div>
        </VisibilitySensor >


    )
}

export default memo(ChunkError)
