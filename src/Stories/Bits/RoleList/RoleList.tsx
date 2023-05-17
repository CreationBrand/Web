/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Chip } from '@mui/material'
import { mMuted, sMuted } from '../Text/Text'


const C = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '4px',
    }),
    list: css({
        display: 'flex',
    }),
}



const RoleList = ({ roles }: any) => {

    let list = roles?.map((role: any) => {
        //@ts-ignore
        return <Chip
            key={role.id}
            sx={{
                height: '18px',
                padding: '4px 0px',
                color: role.color ? "#" + role.color.toString(16) : '#d7dadc',
                fontFamily: 'Noto Sans',
                fontSize: '10px',
                fontWeight: '700',
                lineHeight: '18px',
                background: 'transparent',
                border: '2px solid #b9b6ba',
                borderColor: role.color ? "#" + role.color.toString(16) : '#b9b6ba',
                borderRadius: '5px',
                marginRight: '2px',
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