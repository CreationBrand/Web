/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'

const C = {
    container: css({
        background: '#272732',
        // padding: '8px 0px 8px 0px',
        borderRadius: '8px',
        width: '100%',
        height: '40px',
        fontFamily: 'Noto Sans',

    }),
}
const MessengerFilter = ({ value, onChange }: any) => {
    return (
        <div css={C.container}>
            <ButtonGroup
                color="secondary"
                variant="text"
                aria-label="medium secondary button group"
                sx={{ height: '40px', borderRadius: '8px' }}
                fullWidth
            >
                <Button
                    size="small"
                    onClick={() => onChange('active')}
                    sx={{
                        borderColor: '#4e4e5a !important',

                        fontSize: '10px', color: value === 'active' ? '#60ff67' : ''
                    }}
                >
                    Active
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('pending')}
                    sx={{ borderColor: '#4e4e5a !important', fontSize: '10px', color: value === 'pending' ? '#bb9666' : '' }}
                >
                    Pending
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('closed')}
                    sx={{ borderColor: '#4e4e5a !important', fontSize: '10px', color: value === 'closed' ? '#6671bb' : '' }}
                >
                    Closed
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('blocked')}
                    sx={{ borderColor: '#4e4e5a !important', fontSize: '10px', color: value === 'blocked' ? '#bb6666' : '' }}
                >
                    Blocked
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default MessengerFilter
