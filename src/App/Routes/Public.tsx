import { Routes, Route, Navigate } from 'react-router-dom'

import Auth from 'App/Pages/Auth'
import Login from 'Stories/Login/Login'
import Signup from 'Stories/Signup/Signup'
import Verify from 'Stories/Verify/Verify'

var Public = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Landing</div>}></Route>
            <Route path="auth" element={<Auth />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify" element={<Verify />} />
                <Route path="*" element={<div>error</div>} />

            </Route>
            {/* <Route path="/signup" element={<div>404</div>}></Route>
                <Route path="/home" element={<Home />}></Route> */}
            <Route path="*" element={ <Navigate to="auth" replace={true} />}/>
        </Routes>
    )
}
export default Public
