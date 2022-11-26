import { Routes, Route, Navigate } from 'react-router-dom'

import Auth from 'App/Pages/Auth'
import Login from 'Stories/Views/Login/Login'
import Signup from 'Stories/Views/Signup/Signup'
import Verify from 'Stories/Views/Verify/Verify'
import { colorLog } from 'Util'

var Public = () => {
    colorLog('info','Credentials not found.')

    return (
        <Routes>
            {/* <Route path="/" element={<div>Landing</div>}></Route> */}
            <Route path="auth" element={<Auth />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify" element={<Verify />} />
                <Route path="*" element={ <Navigate to="auth" replace={true} />}/>
            </Route>
            {/* <Route path="/signup" element={<div>404</div>}></Route>
                <Route path="/home" element={<Home />}></Route> */}
            <Route path="*" element={ <Navigate to="auth" replace={true} />}/>
        </Routes>
    )
}
export default Public
