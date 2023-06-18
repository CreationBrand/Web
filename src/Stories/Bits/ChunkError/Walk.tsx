/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Visibility } from '@mui/icons-material';
import { textNormal } from 'Global/Mixins'
import { socketFlow } from 'State/Flow';
import { on } from 'events';
import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const C = {
  container: css({
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    margin: 'auto 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  inner: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '200px',
    width: '100%',
  }),

}

const ChunkError = ({ variant }: any) => {

  const socket = useRecoilValue(socketFlow)


  let colors: any = {
    error: '#fb4b4b',
    loading: '#4b77fb',
    end: '#fbb24b',
    connected: '#51fb4b',
    disconnected: '#fb8c4b',
  }

  if (socket === 'error') variant = 'error'


  const wrap = css`

    rotate:     90deg;
    transform:scale(0.4);

    svg {
        overflow: visible;
        width: 100px;
        height: 150px;
      }
      svg g {
        // animation: slide 2s linear infinite;
      }
      svg g:nth-of-type(2) {
        animation-delay: 0.5s;
      }
      svg g:nth-of-type(2) path {
        animation-delay: 0.5s;
        stroke-dasharray: 0px 158px;
        stroke-dashoffset: 1px;
      }
      svg path {
        stroke: url(#gradient2);
        stroke-width: 20px;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 0 157px;
        stroke-dashoffset: 0;
        // animation: escalade 2s cubic-bezier(0.8, 0, 0.2, 1) infinite;
      }
      
      @keyframes slide {
        0% {
          transform: translateY(-50px);
        }
        100% {
          transform: translateY(50px);
        }
      }
      @keyframes escalade {
        0% {
          stroke-dasharray: 0 157px;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 157px 157px;
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dasharray: 157px 157px;
          stroke-dashoffset: -156px;
        }
      }
  `


  return (
    <div css={C.container} key={'chunckerror'}>
      <div css={C.inner}>

        <div css={[textNormal('t'), { fontWeight: '400', letterSpacing: '1px', }]}>
          {variant === 'error' && 'Something went wrong...'}
          {variant === 'loading' && 'Loading...'}
          {variant === 'end' && 'Nothing else to load...'}
          {variant === 'connected' && 'Connected!'}
          {variant === 'disconnected' && 'Disconnected...'}
        </div>

        {/* 
        <div css={wrap}>
          <svg>
            <g>
              <path d="M 50,100 A 1,1 0 0 1 50,0" />
            </g>
            <g>
              <path d="M 50,75 A 1,1 0 0 0 50,-25" />
            </g>
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#8e58f2", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: variant ? colors[variant] :"#4b77fb", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div> */}


      </div>

    </div>


  )
}

export default memo(ChunkError)
