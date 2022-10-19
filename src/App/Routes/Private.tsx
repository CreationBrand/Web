import Home from 'App/Pages/Home'
import { Routes, Route } from 'react-router-dom'

var Private = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/error" element={<div>404</div>}></Route>
        </Routes>
    )
}
export default Private
