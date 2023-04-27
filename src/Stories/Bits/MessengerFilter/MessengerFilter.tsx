/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'

const C = {
    container: css({
        background: '#272732',
        padding: '8px 0px 8px 0px',
        borderRadius: '8px',
        width:'100%',
        height: '40px',
    }),
}
const MessengerFilter = ({ value, onChange }: any) => {
    return (
        <div css={C.container}>
            <ButtonGroup
                color="secondary"
                variant="text"
                aria-label="medium secondary button group"
                sx={{ fontSize: '8px' }}
                fullWidth
            >
                <Button
                    size="small"
                    onClick={() => onChange('active')}
                    sx={{ fontSize: '9px', fontFamily: 'Ubuntu', color: value === 'active' ? '#66bb6a' : '' }}
                >
                    Active
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('pending')}
                    sx={{ fontSize: '9px', fontFamily: 'Ubuntu', color: value === 'pending' ? '#bb9666' : '' }}
                >
                    Pending
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('closed')}
                    sx={{ fontSize: '9px', fontFamily: 'Ubuntu', color: value === 'closed' ? '#6671bb' : '' }}
                >
                    Closed
                </Button>
                <Button
                    size="small"
                    onClick={() => onChange('blocked')}
                    sx={{ fontSize: '9px', fontFamily: 'Ubuntu', color: value === 'blocked' ? '#bb6666' : '' }}
                >
                    Blocked
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default MessengerFilter
