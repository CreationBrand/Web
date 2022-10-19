/** @jsxImportSource @emotion/react */

import Mono from 'Comps/Views/Layout/Mono'
import Grid from 'Comps/Unstyled/Grid/Grid'

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
                Loading
            </Grid>
        </Mono>
    )
}

export default Loading
