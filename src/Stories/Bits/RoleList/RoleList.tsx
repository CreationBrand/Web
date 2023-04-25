/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Chip } from '@mui/material'
import { mMuted, sMuted } from '../Text/Text'


const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    }),
    list: css({
        display: 'flex',
    }),
}



const RoleList = ({ title, roles }: any) => {

    console.log(roles)

    let list = roles?.map((role: any) => {
        console.log(role)
        //@ts-ignore
        return <Chip
            sx={{
                height: '22px',
                padding: '4px',
                color: role.color ? role.color : '#e0e1e5',
                fontFamily: 'Inter',
                fontSize: '12px',
                background: '#272732',
                borderRadius: '8px',
                marginLeft: '2px',
            }}
            size='small'
            label={role.title}>
        </Chip>
    })

    return <div css={C.container}>

        <div css={sMuted}>{title && title}</div>
        <div css={C.list}> {list}</div>
    </div>
}

export default RoleList
