/** @jsxImportSource @emotion/react */
import { text_2 } from '@/global/var';

import { css } from '@emotion/react'
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import VisibilitySensor from 'react-visibility-sensor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';


const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        color: text_2,
        fontSize: '12px',
        fontWeight: 'bold',
    }),
}

const Loader = ({ onLoad, variant }: any) => {


    // useEffect(() => {
    //     onLoad()
    // }, [])

    const handleVisibility = (isVisible: boolean) => {
        if (isVisible) onLoad()
    }


    return <VisibilitySensor onChange={handleVisibility}>
        <div css={C.container}>

            {variant === 'loading' && <>
                <HourglassEmptyRoundedIcon css={{ fontSize: '32px' }} />
                Loading...
            </>}

            {variant === 'end' && <>
                <FolderOpenIcon css={{ fontSize: '32px' }} />
                Nothing else to load...
            </>}

        </div>
    </VisibilitySensor>
};



export default Loader