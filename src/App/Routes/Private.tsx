import { Home, CommunitySettings } from 'App/Pages'
import Settings from 'App/Pages/PersonSettings'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Error from 'Stories/Error/Error'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import PostList from 'Stories/Chunk/Lists/PostList'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import Submit from 'Stories/Views/Submit/Submit'
import MessengerList from 'Stories/Chunk/Lists/MessengerList'
import GroupList from 'Stories/Chunk/Lists/GroupList'
import EditCommunity from 'Stories/Views/EditCommunity/EditCommunity'

var Private = () => {

    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Home />}>

                    <Route
                        path="/submit"
                        element={<Submit />} />

                    <Route
                        path="m/:messenger_id"
                        element={<MessengerList />}
                    />

                    <Route
                        path="/home"
                        element={<GlobalList type="home" />}
                    ></Route>
                    <Route
                        path="/trending"
                        element={<GlobalList type="trending" />}></Route>

                    <Route
                        path="g/:group_id"
                        element={<GroupList />}
                    ></Route>


                    <Route
                        path="c/:community_id"
                        element={<CommunityList />}
                    ></Route>
                    <Route
                        path="c/:community_id/p/:post_id"
                        element={<PostList />}
                    ></Route>

                    <Route
                        path="c/:community_id/edit"
                        element={<EditCommunity />}
                    ></Route>


                </Route>


                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/error" element={<div>404</div>}></Route>
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </>
    )
}
export default Private
