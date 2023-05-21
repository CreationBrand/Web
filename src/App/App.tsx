import 'Global/styles.css'

import { Public, Private } from 'App/Routes'
import { useAuth } from 'Hooks'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { memo } from 'react'


const App = () => {
    const [isAuth, loading] = useAuth()

    if (loading) return <div style={{ height: '100vh' }}><ChunkError variant={'loading'} /></div>
    if (isAuth) return <Private />

    return <Public />
}

export default memo(App)
