/** @jsxImportSource @emotion/react */
import FilterMenu from '@/components/menu/FilterMenu';
import SortMenu from '@/components/menu/SortMenu';
import StyleMenu from '@/components/menu/StyleMenu';
import { bg_1, bg_3 } from '@/global/var';
import { layoutSize } from '@/state/layout';
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil';

const C = {
    container: css({
        width: '100%',
        margin: '12px 0px 0px 0px',
        // height: '40px',
        borderRadius: '8px',
        padding: '0px 8px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        gap: '8px',
    }),
}


const MainFilter = ({ type }: any) => {

    const layout = useRecoilValue(layoutSize)



    return <div css={C.container} style={{
        marginTop: layout === 'mobile' ? '8px' : '12px',
        marginBottom: layout === 'mobile' ? '8px' : '0px',
        borderRadius: layout === 'mobile' ? '0px' : '8px',
        background: layout === 'mobile' ? 'transparent' : bg_3,

    }}>

        <SortMenu community_id={type} />
        <StyleMenu />
        <div css={{ marginLeft: 'auto' }} />
        <FilterMenu />

    </div>
}



export default MainFilter;