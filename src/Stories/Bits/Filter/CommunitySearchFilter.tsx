/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import FilterMenu from 'Stories/Menu/FilterMenu'
import { useParams } from 'react-router-dom'

const C = {
    container: css({
        width: '100%',
        padding: '16px 2px 0px 0px',
    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        height: '42px',
        background: '#272732',
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        maxWidth: '800px',
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'noto sans',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontWeight: 600,
        color: '#f2f3f5',
    }),
}

const CommunitySearchFilter = () => {

    const params = useParams()

    return (

        <div css={C.container}>
            <div css={C.inner}>

                <div>Searching For: {params.query}</div>

                <FilterMenu />



            </div>
        </div>
    )
}

export default CommunitySearchFilter
