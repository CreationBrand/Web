/** @jsxImportSource @emotion/react */

import Mono from 'Stories/Misc/Mono'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ServerStatus from 'Stories/Objects/ServerStatus/ServerStatus'

const Auth = () => {
    let location = useLocation()

    return (
        <Mono background="pri">
            <div
                css={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LayoutGroup>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={location.pathname}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -100, scale: 0.9 }}
                            children={<Outlet />}
                        />
                    </AnimatePresence>
                </LayoutGroup>
            </div>
            <ServerStatus />
        </Mono>
    )
}

export default Auth
