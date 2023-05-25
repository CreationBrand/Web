import Settings from 'App/Pages/PersonSettings'
import { Routes, Route, Navigate, } from 'react-router-dom'
import Error from 'Stories/Error/Error'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import PostList from 'Stories/Chunk/Lists/PostList'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import Submit from 'Stories/Views/Submit/Submit'
import MessengerList from 'Stories/Chunk/Lists/MessengerList'
import GroupList from 'Stories/Chunk/Lists/GroupList'
import EditCommunity from 'Stories/Views/EditCommunity'
import EditPerson from 'Stories/Views/EditPerson'
import { memo } from 'react'
import Home from 'App/Pages/Home'
import SearchList from 'Stories/Chunk/Lists/SearchList'

var Private = () => {

    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Home />}>


                    <Route path="/settings" element={<EditPerson />}></Route>



                    <Route
                        path="/search/:query"
                        element={<SearchList />} />


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


                <Route path="/error" element={<div>404</div>}></Route>
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </>
    )
}
export default memo(Private)
