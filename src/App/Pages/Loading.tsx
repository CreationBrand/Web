/** @jsxImportSource @emotion/react */

import Mono from 'Stories/Misc/Mono'
import Paper from 'Stories/Misc/Paper'
import { CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <Mono background="pri">
            <div>
                <CircularProgress size={60} />
            </div>
        </Mono>
    )
}

export default Loading
