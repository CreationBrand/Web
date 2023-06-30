import { Routes, Route, Navigate, useLocation, } from 'react-router-dom'
import Preview from 'App/Pages/Preview'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import Error from 'Stories/Chunk/Error/Error'
import Announcements from 'Stories/Views/Announcements'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import PostList from 'Stories/Chunk/Lists/PostList'
import { memo, useEffect } from 'react'
import SearchList from 'Stories/Chunk/Lists/SearchList'
import Contact from 'Stories/Views/Contact'
import PersonList from 'Stories/Chunk/Lists/PersonList'
import SearchCommunityList from 'Stories/Chunk/Lists/SearchCommunityList'
import { useRecoilState } from 'recoil'
import { contentFlow } from 'State/Flow'

var Public = () => {

    const location = useLocation()
    const [value, setContentFlow] = useRecoilState(contentFlow)


    useEffect(() => {
        let parts: any = location.pathname.split('/')
        console.log(parts)
        switch (true) {
            case parts[1] === 'trending':
                return setContentFlow('global')
            case parts[1] === 'home':
                return setContentFlow('global')
            case parts[1] === 'c' && parts.length === 3:
                return setContentFlow('community')
            case parts[1] === 'search':
                return setContentFlow('search')
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
            <Error />

            <Routes>


                <Route path="/" element={<Preview />}>

                    <Route path="/" element={<Navigate to="/trending" replace={true} />} />
                    <Route path="/home" element={<Navigate to="/trending" replace={true} />} />


                    {/* fake */}
                    <Route path="/trending" element={<div />} />
                    <Route path="/home" element={<div />} />
                    <Route path="/c/:community_id" element={<div />} />
                    <Route path="/g/:group_id" element={<div />} />



                    {/* layover lists */}
                    <Route path="search/:query" element={<SearchList />} />
                    <Route path="c/:community_id/p/:post_id" element={<PostList />} />
                    <Route path="c/:community_id/search/:query" element={<SearchCommunityList />} />
                    <Route path="p/:person_id" element={<PersonList />} />


                    <Route path="announcements" element={<Announcements />} />
                    <Route path="contact" element={<Contact />} />


                </Route>



                <Route path="*" element={<Navigate to="/trending" replace={true} />} />

            </Routes>
        </>
    )
}
export default memo(Public)
