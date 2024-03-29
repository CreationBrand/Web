import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { memo } from 'react'
import Preview from '@/app/pages/Preview'
import Announcements from '@/views/Announcements'
import Contact from '@/views/Contact'
import LoginSignup from '@/components/popups/LoginSignup'
import GlobalList from '@/components/lists/GlobalList'
import PostList from '@/components/lists/PostList'
import PersonList from '@/components/lists/PersonList'
import SearchList from '@/components/lists/SearchList'
import SearchCommunityList from '@/components/lists/SearchCommunityList'
import Communitys from '@/views/Communitys'
import CommentList from '@/components/lists/CommentList'
import Typeahead from '@/views/Typeahead'
import React from 'react'

var Public = () => {

    return (
        <Routes>
            <Route path="/" element={<Preview />}>


                {/* reroutes */}
                <Route path="/" element={<Navigate to="/popular" replace={true} />} />
                <Route path="/home" element={<Navigate to="/popular" replace={true} />} />


                {/* FAKE */}
                <Route path="/popular" element={<Outlet />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="c/:community_id" element={<Outlet />} >
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="/communitys" element={<Communitys />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>


                {/* REAL */}
                <Route path="announcements" element={<Announcements />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="contact" element={<Contact />} >
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="c/:community_id/p/:post_id" element={<PostList />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="p/:person_id" element={<PersonList />} >
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="search/:query" element={<SearchList />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="c/:community_id/p/:post_id" element={<PostList />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="c/:community_id/search/:query" element={<SearchCommunityList />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>
                <Route path="/c/:community_id/p/:post_id/c/:comment_id" element={<CommentList />}>
                    <Route path='auth' element={<LoginSignup />} />
                    <Route path='typeahead' element={<Typeahead />} />
                </Route>

            </Route>
            <Route path="*" element={<Navigate to="/popular" replace={true} />} />
        </Routes>

    )
}
export default memo(Public)

