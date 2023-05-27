/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, ButtonGroup, Input } from '@mui/material'
import { ManageSearchRounded } from '@mui/icons-material'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import EmailIcon from '@mui/icons-material/Email';

const C = {
    container: css({
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        height: '40px',
        fontFamily: 'Noto Sans',

    }),
}
const MessengerFilter = ({ value, onChange, filter, filterChange }: any) => {


    return (
        <div css={C.container}>

            <Input
                onChange={onChange}
                value={value}
                fullWidth
                disableUnderline
                placeholder="Search..."
                startAdornment={<ManageSearchRounded color="secondary" />}
                sx={{
                    input: {
                        paddingLeft: '4px',

                    },
                    paddingLeft: '4px',

                    height: '32px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    backgroundColor: '#0f0e10',
                    border: '2px solid',
                    borderColor: '#0f0e10',
                }}
            />

        {filter === 'active' ?
                <AllInboxIcon
                    onClick={() => filterChange('pending')}
                    sx={{
                        color: '#b9bbbe',
                        fontSize: '32px',
                        cursor: 'pointer',
                        ':hover': {
                            color: '#ffffff',

                        },
                    }} />
                :
                <EmailIcon
                    onClick={() => filterChange('active')}
                    sx={{
                        color: '#b9bbbe',
                        fontSize: '32px',
                        cursor: 'pointer',
                        ':hover': {
                            color: '#ffffff',

                        },
                    }} />

            }

        </div>
    )
}

export default MessengerFilter
