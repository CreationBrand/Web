/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import { Button } from '@mui/material';
import { sMuted } from 'Stories/Text/Text';


const C = {
    container: css({
        width: '100%',
        height: '48px',
        background: '#343442',
        borderRadius: '8px',
        margin: '0px 20px 0px 20px',
        padding: '0px 20px 0px 20px',
        gap: '8px',
        // justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex'
    }),
}

const FilterBar = () => {

    return (

        <div css={C.container}>

            <Button variant="text" size='small' color="secondary"
                sx={{ gap: '8px', borderRadius: '12px' }}>
                <WhatshotRoundedIcon />
                <div css={sMuted}>HOT</div>
            </Button>
            <Button variant="text" size='small' color="secondary" sx={{ gap: '8px', borderRadius: '12px' }}>
                <NewReleasesRoundedIcon />
                <div css={sMuted}>NEW</div>
            </Button>
        </div>
    );
}

export default FilterBar;