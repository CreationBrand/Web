import { Routes, Route, useLocation, Navigate, Outlet, } from 'react-router-dom'
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
import EditGroup from 'Stories/Popups/EditGroup'
import CreateCommunity from 'Stories/Popups/CreateCommunity'
import AddGroup from 'Stories/Popups/AddGroup'

var Private = () => {

    const location = useLocation()
    const setContentFlow = useSetRecoilState(contentFlow)

    useEffect(() => {
        let parts: any = location.pathname.split('/')
        switch (true) {
            case parts[1] === 'trending':
                return setContentFlow('global')
            case parts[1] === 'home':
                return setContentFlow('global')
            case parts[1] === 'search':
                return setContentFlow('search')
            case parts[1] === 'c' && parts[3] === 'search':
                return setContentFlow('searchCommunity')
            case parts[1] === 'c' && parts.length === 3:
                return setContentFlow('community')
            case parts[1] === 'c' && parts[3] === 'p':
                return setContentFlow('post')
            case parts[1] === 'c' && parts[3] === 'p' && parts[5] === 'c':
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

                    <Route path="/" element={<Navigate to="/trending" replace={true} />} />

                    {/* fake */}
                    <Route path="/trending">
                        <Route index element={<div />} />
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

                    <Route path="/p/:person_id"  >
                        <Route index element={<PersonList />} />
                        <Route path="create-community" element={<CreateCommunity />} />
                        <Route path="create-group" element={<AddGroup />} />
                    </Route>

                    <Route path="/m/:messenger_id"  >
                        <Route index element={<MessengerList />} />
                        <Route path="create-community" element={<CreateCommunity />} />
                        <Route path="create-group" element={<AddGroup />} />
                    </Route>

                    <Route path="/c/:community_id/p/:post_id">
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

                <Route path="/error" element={<div>404</div>} />
                <Route path="*" element={<Navigate to="/trending" replace={true} />} />
            </Routes >
        </>
    )
}
export default memo(Private)


const EmptyRoute = memo(() => {
    return <Outlet />;
})