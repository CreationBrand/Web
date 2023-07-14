import 'Global/styles.css'

import { Public, Private } from 'App/Routes'
import { useAuth } from 'Hooks'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { memo, useLayoutEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { socketFlow } from 'State/Flow'
import useWindow from 'Hooks/useWindow'
import { layoutSizeData } from 'State/Data'


const App = () => {
    const [isAuth, loading] = useAuth()
    const socket = useRecoilValue(socketFlow)
    const { width } = useWindow()
    const setLayoutSize = useSetRecoilState(layoutSizeData)

    useLayoutEffect(() => {
        if (width < 800) setLayoutSize('mobile')
        if (width > 800) setLayoutSize('desktop')
    }, [width])

    if (loading || socket === 'loading') return <div style={{ height: '100vh' }}><ChunkError variant={'loading'} /></div>
    if (isAuth) return <Private />

    return <Public />
}

export default memo(App)
