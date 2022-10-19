/** @jsxImportSource @emotion/react */

import Mono from 'Comps/Views/Layout/Mono'
import Grid from 'Comps/Unstyled/Grid/Grid'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Auth = () => {
    let location = useLocation()

    return (
        <Mono background="pri">
            <Grid
                root
                width="100%"
                height="100%"
                justify="center"
                align="center"
            >
                <LayoutGroup>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -100, scale: 0.9 }}
                            children={<Outlet />}
                        />
                    </AnimatePresence>
                </LayoutGroup>
            </Grid>
        </Mono>
    )
}

export default Auth
