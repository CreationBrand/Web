/** @jsxImportSource @emotion/react */

import Mono from 'Stories/Mono'
import Grid from 'Comps/Unstyled/Grid/Grid'
import Paper from 'Stories/Paper'
import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <Mono background="pri">
            <Grid
                root
                width="100%"
                height="100%"
                justify="center"
                align="center"
            >
                <CircularProgress size={60} />
            </Grid>
        </Mono>
    )
}

export default Loading
