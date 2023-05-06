import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from 'App/Pages/Auth'
import Login from 'Stories/Views/Login/Login'
import Signup from 'Stories/Views/Signup/Signup'
import Verify from 'Stories/Views/Verify/Verify'
import Preview from 'App/Pages/Preview'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import Error from 'Stories/Error/Error'

var Public = () => {

    console.log('%c [Route] ', 'background: #000; color: #55daae', 'Loading Public Routes');

    return (
        <>
            <Error />

            <Routes>

                <Route path="/" element={<Preview />}>
                    <Route path="/trending" element={<GlobalList />} />
                </Route>

                <Route path="auth" element={<Auth />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="verify" element={<Verify />} />
                    <Route path="*" element={<Navigate to="auth" replace={true} />} />
                </Route>

                <Route path="*" element={<Navigate to="/auth" replace={true} />} />

            </Routes>
        </>
    )
}
export default Public
