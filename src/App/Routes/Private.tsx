import Home from 'App/Pages/Home'
import Settings from 'App/Pages/Settings'
import { Routes, Route, Navigate } from 'react-router-dom'
import Community from 'Stories/Community/Community'
import Default from 'Stories/Default/Default'
import Error from 'Stories/Error/Error'
import PostView from 'Stories/PostView/PostView'


var Private = () => {



    return (
        <>
            <Error />
            <Routes>
                <Route path="/" element={<Home />}>

                    <Route path="/home" element={<Default type='home'/>}></Route>
                    <Route path="/trending" element={<Default type='hot'/>}></Route>


                    <Route path="c/:community_id" element={<Community />}>
                    </Route>

                    <Route path="c/:community_id/p/:post_id" element={<PostView />}></Route>


                </Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/error" element={<div>404</div>}></Route>
                <Route path="*" element={<Navigate to="/" replace={true} />} />

            </Routes>
        </>
    )
}
export default Private
