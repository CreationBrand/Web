import { Routes, Route, useLocation, Navigate, } from 'react-router-dom'
import Error from 'Stories/Chunk/Error/Error'
import PostList from 'Stories/Chunk/Lists/PostList'
import MessengerList from 'Stories/Chunk/Lists/MessengerList'
import EditCommunity from 'Stories/Views/EditCommunity'
import EditPerson from 'Stories/Views/EditPerson'
import { memo, useEffect } from 'react'
import Home from 'App/Pages/Home'
import SearchList from 'Stories/Chunk/Lists/SearchList'
import PersonList from 'Stories/Chunk/Lists/PersonList'
import CommentList from 'Stories/Chunk/Lists/CommentList'
import NotiList from 'Stories/Chunk/Lists/NotiList'
import SearchCommunityList from 'Stories/Chunk/Lists/SearchCommunityList'
import Submit from 'Stories/Views/Submit'
import { contentFlow } from 'State/Flow'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { set } from 'react-hook-form'

var Private = () => {

    const location = useLocation()
    const [value, setContentFlow] = useRecoilState(contentFlow)
    
    useEffect(() => {
        let parts: any = location.pathname.split('/')
        switch (true) {
            case parts[1] === 'trending':
                return setContentFlow('global')
            case parts[1] === 'home':
                return setContentFlow('global')
            case parts[1] === 'c' && parts.length === 3:
                return setContentFlow('community')
            case parts[1] === 'c' && parts[4] === 'p':
                return setContentFlow('post')
            case parts[1] === 'c' && parts[4] === 'p' && parts[6] === 'c':
                return setContentFlow('comment')
            case parts[1] === 'g':
                return setContentFlow('group')
            case parts[1] === 'p':
                return setContentFlow('person')
            case parts[1] === 'm':
                return setContentFlow('messenger')
            case parts[1] === 'settings':
                return setContentFlow('settings')
            case parts[1] === 'submit':
                return setContentFlow('submit')
            case parts[1] === 'notifications':
                return setContentFlow('notifications')
        }

    }, [location.pathname]);



    return (
        <>
            {/* <Error /> */}
            <Routes>

                <Route path="/" element={<Home />}>

                    {/* fake */}
                    <Route path="/trending" element={<div />} />
                    <Route path="/home" element={<div />} />
                    <Route path="/c/:community_id" element={<div />} />
                    <Route path="/g/:group_id" element={<div />} />

                    {/* real */}
                    <Route path="/settings" element={<EditPerson />} />
                    <Route path="/submit" element={<Submit />} />
                    <Route path="/notifications" element={<NotiList />} />

                    <Route path="/search/:query" element={<SearchList />} />
                    <Route path="/c/:community_id/search/:query" element={<SearchCommunityList />} />

                    <Route path="/p/:person_id" element={<PersonList />} />
                    <Route path="/m/:messenger_id" element={<MessengerList />} />

                    <Route path="/c/:community_id/p/:post_id" element={<PostList />} />
                    <Route path="/c/:community_id/p/:post_id/c/:comment_id" element={<CommentList />} />
                    <Route path="/c/:community_id/edit" element={<EditCommunity />} />



                </Route>

                <Route path="/error" element={<div>404</div>} />
                <Route path="*" element={<Navigate to="/trending" replace={true} />} />
            </Routes>
        </>
    )
}
export default memo(Private)
