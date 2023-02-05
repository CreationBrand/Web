import { Home, CommunitySettings } from 'App/Pages'
import Settings from 'App/Pages/PersonSettings'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Error from 'Stories/Error/Error'
import GlobalList from 'Stories/Chunk/Lists/GlobalList'
import PostList from 'Stories/Chunk/Lists/PostList'
import { useEffect } from 'react'
import { pageFlow } from 'State/Flow'
import { useRecoilState } from 'recoil'
import CommunityList from 'Stories/Chunk/Lists/CommunityList'
import Submit from 'Stories/Views/Submit/Submit'

var Private = () => {

    let [page, setPage] = useRecoilState(pageFlow)
    let location = useLocation();


    useEffect(() => {
        let path = location.pathname.split('/')[1]

        if (path === 'home') setPage('home')
        else if (path === 'trending') setPage('trending')
        else if (path === 'c') setPage('community')

    }, [location]);


    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Home />}>

                    <Route
                        path="/submit"
                        element={<Submit />} />

                    {/* <Route
                        path="m/:messenger_id"
                        element={<MessengerView />}
                    /> */}

                    <Route
                        path="/home"
                        element={<GlobalList />}
                    ></Route>
                    <Route
                        path="/trending"
                        element={<GlobalList />}></Route>
                    <Route
                        path="c/:community_id"
                        element={<CommunityList />}
                    ></Route>
                    <Route
                        path="c/:community_id/p/:post_id"
                        element={<PostList />}
                    ></Route>
                </Route>
                <Route
                    path="c/:community_id/settings"
                    element={<CommunitySettings />}
                ></Route>

                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/error" element={<div>404</div>}></Route>
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </>
    )
}
export default Private
