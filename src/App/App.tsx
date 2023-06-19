import 'Global/styles.css'

import { Public, Private } from 'App/Routes'
import { useAuth } from 'Hooks'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { socketFlow } from 'State/Flow'


const App = () => {
    const [isAuth, loading] = useAuth()
    const socket = useRecoilValue(socketFlow)

    if (loading || socket === 'loading') return <div style={{ height: '100vh' }}><ChunkError variant={'loading'} /></div>
    if (isAuth) return <Private />

    return <Public />
}

export default memo(App)
