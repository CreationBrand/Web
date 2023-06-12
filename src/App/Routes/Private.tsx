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
import PersonList from 'Stories/Chunk/Lists/PersonList'
import CommentList from 'Stories/Chunk/Lists/CommentList'
import NotiList from 'Stories/Chunk/Lists/NotiList'

var Private = () => {

    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Home />}>

                    <Route path="/settings" element={<EditPerson />} />
                    <Route path="/submit" element={<Submit />} />
                    <Route path="/notifications" element={<NotiList />} />

                    <Route path="/search/:query" element={<SearchList />} />
                    <Route path="g/:group_id" element={<GroupList />} />
                    <Route path="p/:person_id" element={<PersonList />} />
                    <Route path="m/:messenger_id" element={<MessengerList />} />

                    <Route path="/home" element={<GlobalList type="home" />} />
                    <Route path="/trending" element={<GlobalList type="trending" />} />

                    <Route path="c/:community_id" element={<CommunityList />} />
                    <Route path="c/:community_id/p/:post_id" element={<PostList />} />
                    <Route path="c/:community_id/p/:post_id/c/:comment_id" element={<CommentList />} />
                    <Route path="c/:community_id/edit" element={<EditCommunity />} />

                </Route>

                <Route path="/error" element={<div>404</div>} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </>
    )
}
export default memo(Private)
