import 'Global/styles.css'

import { Public, Private } from 'App/Routes'
import { Loading } from 'App/Pages'
import { useAuth } from 'Hooks'
import { useRecoilValue } from 'recoil'
import { socketFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { memo } from 'react'


const App = () => {
    const [isAuth, loading] = useAuth()

    if (loading) return <div style={{ height: '100vh' }}><ChunkError variant={'loading'} /></div>
    if (isAuth) return <Private />

    return <Public />
}

export default memo(App)
