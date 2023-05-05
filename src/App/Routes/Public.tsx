import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Auth from 'App/Pages/Auth'
import Login from 'Stories/Views/Login/Login'
import Signup from 'Stories/Views/Signup/Signup'
import Verify from 'Stories/Views/Verify/Verify'
import Preview from 'App/Pages/Preview'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import { pageFlow } from 'State/Flow'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

var Public = () => {
    console.log('%c [Route] ', 'background: #000; color: #55daae', 'Loading Public Routes');

    let [page, setPage] = useRecoilState(pageFlow)
    let location = useLocation();

    useEffect(() => {
        let path = location.pathname.split('/')[1]
        if (path === 'home') setPage('home')
        else if (path === 'trending') setPage('trending')
        else if (path === 'c') setPage('community')
    }, [location]);



    return (
        <Routes>


            <Route path="/" element={<Preview />}>
                <Route
                    path="/trending"
                    element={<GlobalList />}></Route>
            </Route>

            <Route path="auth" element={<Auth />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify" element={<Verify />} />
                <Route path="*" element={<Navigate to="auth" replace={true} />} />
            </Route>

            <Route path="*" element={<Navigate to="/auth" replace={true} />} />
        </Routes>
    )
}
export default Public
