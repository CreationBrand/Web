import 'Global/styles.css'
import { useAuth } from 'Hooks/useAuth'
import Loading from 'App/Pages/Loading'
import Public from 'App/Routes/Public'
import Private from './Routes/Private'

const App = () => {
    const [isAuth, loading] = useAuth()

    if (loading) return <Loading />
    if (isAuth) return <Private />

    return <Public />
}

export default App
