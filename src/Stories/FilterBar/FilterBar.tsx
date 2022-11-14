/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const C = {
    container: css({
        width: '100%',
        height: '40px',
        background: '#464649',
        borderRadius: '4px',
        margin:'8px',
    }),
}

const FilterBar = () => {

    return (

        <div css={C.container}>
            FilterBar
        </div>
    );
}

export default FilterBar;