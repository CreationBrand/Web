import { Home, CommunitySettings } from 'App/Pages'
import Settings from 'App/Pages/PersonSettings'
import { Routes, Route, Navigate } from 'react-router-dom'
import Error from 'Stories/Error/Error'
import CommunityView from 'Stories/Views/CommunityView'
import PostView from 'Stories/Views/PostView'
import MessengerView from 'Stories/Views/MessengerView'
import DefaultView from 'Stories/Views/DefaultView'

var Private = () => {
    return (
        <>
            <Error />

            <Routes>
                <Route path="/" element={<Home />}>
                    <Route
                        path="m/:messenger_id"
                        element={<MessengerView />}
                    ></Route>

                    <Route
                        path="/home"
                        element={<DefaultView type="home" />}
                    ></Route>
                    <Route
                        path="/trending"
                        element={<DefaultView type="hot" />}
                    ></Route>
                    <Route
                        path="c/:community_id"
                        element={<CommunityView />}
                    ></Route>
                    <Route
                        path="c/:community_id/p/:post_id"
                        element={<PostView />}
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
