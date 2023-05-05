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



const RoleList = ({  roles }: any) => {

    let list = roles?.map((role: any) => {
        //@ts-ignore
        return <Chip
            sx={{
                height: '22px',
                padding: '4px',
                color: role.color ? role.color : '#d7dadc',
                fontFamily: 'Noto Sans',
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
        <div css={C.list}>{list}</div>
    </div>
}

export default RoleList




/*
communitry list
join leave
search bar


asdf

*/