import Home from 'App/Pages/Home'
import Settings from 'App/Pages/Settings'
import { Routes, Route, Navigate } from 'react-router-dom'
import Community from 'Stories/Community/Community'

var Private = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="c/:public_id" element={<Community/>}></Route>

            </Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/error" element={<div>404</div>}></Route>
            <Route path="*" element={<Navigate to="/" replace={true} />} />

        </Routes>
    )
}
export default Private
