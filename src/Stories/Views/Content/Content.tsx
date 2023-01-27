/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Outlet } from 'react-router-dom'

import Nav from 'Stories/Chunk/Nav/Nav'

import ControlBar from 'Stories/Chunk/ControlBar/ControlBar'
import { AnimatePresence } from 'framer-motion'

const C = {
    container: css({
        height: 'calc(100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const ContentView = () => {

    console.log('content')


    return (
        <div id="CONTENT" css={C.container}>
            <Nav />
            <AnimatePresence>
                <Outlet />
            </AnimatePresence>
            <ControlBar />

        </div>
    )
}

export default ContentView
