/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import RoleList from 'Stories/Bits/RoleList/RoleList'

const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '8px',
        borderRadius: '8px',
        background: '#272732',
    }),

}



const RolePane = ({ roles }: any) => {

    return <div css={C.container}>

        <RoleList
            title='Roles'
            roles={roles}></RoleList>

        asdfasdf

    </div>
}

export default RolePane
