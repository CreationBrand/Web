import 'Global/styles.css'

import { Public, Private } from 'App/Routes'
import { Loading } from 'App/Pages'
import { useAuth } from 'Hooks'

const App = () => {
    const [isAuth, loading] = useAuth()

    if (loading) return <Loading />
    if (isAuth) return <Private />

    return <Public />
}

export default App
