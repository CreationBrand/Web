import { Home, CommunitySettings } from "App/Pages"
import Settings from "App/Pages/PersonSettings"
import { Routes, Route, Navigate } from "react-router-dom"
import Default from "Stories/Pure/Default/Default"
import Community from "Stories/Views/Community/Community"
import PostView from "Stories/Views/PostView/PostView"

import Error from 'Stories/Error/Error'
import Messenger from "Stories/Views/Messenger/Messenger"


var Private = () => {



    return (
        <>
            <Error />
            <Routes>
                <Route path="/" element={<Home />}>


                    <Route path="m/:messenger_id" element={<Messenger />}></Route>

                    <Route path="/home" element={<Default type='home' />}></Route>
                    <Route path="/trending" element={<Default type='hot' />}></Route>
                    <Route path="c/:community_id" element={<Community />}></Route>
                    <Route path="c/:community_id/p/:post_id" element={<PostView />}></Route>

                </Route>
                <Route path="c/:community_id/settings" element={<CommunitySettings />}></Route>

                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/error" element={<div>404</div>}></Route>
                <Route path="*" element={<Navigate to="/" replace={true} />} />

            </Routes>
        </>
    )
}
export default Private
