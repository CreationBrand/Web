import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { memo } from 'react'
import Announcements from '@/views/Announcements'
import Contact from '@/views/Contact'
import LoginSignup from '@/components/popups/LoginSignup'
import PostList from '@/components/lists/PostList'
import PersonList from '@/components/lists/PersonList'
import SearchList from '@/components/lists/SearchList'
import SearchCommunityList from '@/components/lists/SearchCommunityList'
import Home from '../pages/Home'
import EditPerson from '@/views/EditPerson'
import Submit from '@/views/Submit'
import NotiList from '@/components/lists/NotiList'
import CommentList from '@/components/lists/CommentList'
// import MessengerList from '@/components/lists/MessengerList'
import AddGroup from '@/components/popups/AddGroup'
import CreateCommunity from '@/components/popups/CreateCommunity'
import { MenuList } from '@mui/material'
import MeList from '@/components/lists/MeList'
import EditCommunity from '@/views/EditCommunity'

var Public = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />}>

            <Route path="/" element={<Navigate to="/popular" replace={true} />} />


                <Route path="/popular">
                    <Route index element={<div />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/me">
                    <Route index element={<EmptyRoute />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/home">
                    <Route index element={<div />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/c/:community_id" >
                    <Route index element={<div />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>


                <Route path="/g/:group_id">
                    <Route index element={<div />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>


                {/* real */}
                <Route path="/settings">
                    <Route index element={<EditPerson />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>


                <Route path="/submit">
                    <Route index element={<Submit />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>


                <Route path="/notifications">
                    <Route index element={<NotiList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/search/:query" >
                    <Route index element={<SearchList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/c/:community_id/search/:query" >
                    <Route index element={<SearchCommunityList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/c/:community_id/edit" >
                    <Route index element={<EditCommunity />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>



                <Route path="/p/:person_id" >
                    <Route index element={<PersonList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                {/* <Route path="/m/:messenger_id"  >
                    <Route index element={<MessengerList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route> */}

                <Route path="/c/:community_id/p/:post_id" >
                    <Route index element={<PostList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>

                <Route path="/c/:community_id/p/:post_id/c/:comment_id" >
                    <Route index element={<CommentList />} />
                    <Route path="create-community" element={<CreateCommunity />} />
                    <Route path="create-group" element={<AddGroup />} />
                </Route>



            </Route>



            <Route path="*" element={<Navigate to="/popular" replace={true} />} />
        </Routes >

    )
}
export default memo(Public)


const EmptyRoute = memo(() => {
    return <Outlet />;
})