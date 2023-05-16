import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from 'App/Pages/Auth'

import Preview from 'App/Pages/Preview'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import Error from 'Stories/Error/Error'
import Announcements from 'Stories/Views/Announcements'

var Public = () => {

    console.log('%c [Route] ', 'background: #000; color: #55daae', 'Loading Public Routes');

    return (
        <>
            <Error />

            <Routes>

                <Route path="/" element={<Navigate to="/trending" replace={true} />} />

                <Route path="/" element={<Preview />}>
                    <Route path="/trending" element={<GlobalList type='trending' />} />

                    <Route path="/announcements" element={<Announcements />} />
                </Route>



                <Route path="*" element={<Navigate to="/auth" replace={true} />} />

            </Routes>
        </>
    )
}
export default Public
