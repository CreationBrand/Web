/** @jsxImportSource @emotion/react */
import { bg_3 } from '@/global/var'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';
import FilterMenu from '@/components/menu/FilterMenu';
import StyleMenu from '@/components/menu/StyleMenu';

const C = {
    container: css({
        marginTop: '12px',
        width: '100%',
        height: '42px',
        background: bg_3,
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        maxWidth: '800px',
        display: 'flex',
        // justifyContent: 'space-between',
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 600,
        color: '#f2f3f5',
        alignItems: 'center',

    }),

}

const CommunitySearchFilter = () => {

    const params = useParams()

    return (

        <div css={C.container}>

            <LocationSearchingRoundedIcon />
            {params.query}

            <div css={{ marginLeft: 'auto' }} />
            <FilterMenu />
            <StyleMenu />


        </div>
    )
}

export default CommunitySearchFilter
