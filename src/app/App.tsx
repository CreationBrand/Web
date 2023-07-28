import { memo, useLayoutEffect } from 'react'
import Public from '@/app/routes/Public'
import { layoutSize } from '@/state/layout'
import { useSetRecoilState } from 'recoil'
import useSocket from '@/hooks/util/useSocket'
import useAuth from '@/hooks/util/useAuth'
import Private from './routes/Private'
import useContent from '@/hooks/util/useContent'
import useWindow from '@/hooks/util/useWindow'

const App = () => {
    
    useSocket()
    useContent()

    const [isAuth, loading] = useAuth()
    const { width } = useWindow()
    const setLayoutSize = useSetRecoilState(layoutSize)


    useLayoutEffect(() => {
        if (width < 800) setLayoutSize('mobile')
        if (width > 800) setLayoutSize('desktop')
    }, [width])

    if (loading) return <div style={{ height: '100vh' }}></div>
    if (isAuth) return <Private />

    return <Public />
}

export default memo(App)
