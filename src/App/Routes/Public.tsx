import { Routes, Route, Navigate } from 'react-router-dom'

import Preview from 'App/Pages/Preview'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import Error from 'Stories/Error/Error'
import Announcements from 'Stories/Views/Announcements'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import PostList from 'Stories/Chunk/Lists/PostList'
import { memo } from 'react'

var Public = () => {

    console.log('%c [Route] ', 'background: #000; color: #55daae', 'Loading Public Routes');

    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Navigate to="/trending" replace={true} />} />

                <Route path="/" element={<Preview />}>

                    <Route
                        path="c/:community_id"
                        element={<CommunityList />}
                    ></Route>
                    <Route
                        path="c/:community_id/p/:post_id"
                        element={<PostList />}
                    ></Route>


                    <Route path="/trending" element={<GlobalList type='trending' />} />
                    <Route path="/announcements" element={<Announcements />} />
                </Route>



                <Route path="*" element={<Navigate to="/trending" replace={true} />} />

            </Routes>
        </>
    )
}
export default memo(Public)
