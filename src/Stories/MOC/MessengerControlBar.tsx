/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { mNormal } from 'Stories/Text/Text'
import { IconButton, Input } from '@mui/material'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'

const C = {
    container: css({
        width: 'calc(100% - 40px)',
        margin: 'auto',
        height: '44px !important',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        minHeight: '44px',
        paddingLeft: '16px',
        paddingRight: '16px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '12px',
        marginTop: 'auto',

        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    input: css({
        width: '100%',
        background: '#272732',
        borderRadius: '8px',
        height: '28px',
        marginRight: '8px',
        marginLeft: '8px',
        lineHeight: '28px',
        paddingLeft: '8px',
        color: '#fff'
    }),
    slideContainer: css({
        width: 'calc(100% - 40px)',
        height: '150px',
        background: '#343442',
        margin: '0px 20px ',
        borderRadius: '8px',
        display: 'flex',
        minHeight: '150px',
        marginBottom: '12px',
        overflow: 'hidden'
    }),
    editorContainer: css({
        width: 'calc(100% - 40px)',
        height: 'min-content',
        background: '#343442',

        borderRadius: '8px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '12px'
    }),

    row: css({
        display: 'flex',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        marginRight: '12px'
    })
}

const MessengerControlBar = () => {
    // state

    const handleSubmit = () => {
        console.log('submit')
    }

    return (
        <div css={C.container}>
            <IconButton
                size="small"
                color="secondary"
                disableRipple
                sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                    '&:hover': {
                        color: '#fff'
                    }
                }}
            >
                <AddBoxRoundedIcon />
            </IconButton>

            {/* <div css={C.input}>
                <div css={mNormal}>Create Post </div>
            </div> */}

            <Input css={C.input} disableUnderline multiline></Input>

            <IconButton
                size="small"
                color="secondary"
                disableRipple
                sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                    '&:hover': {
                        color: '#fff'
                    }
                }}
            >
                <ImageOutlinedIcon />
            </IconButton>

            <IconButton
                size="small"
                color="secondary"
                disableRipple
                sx={{
                    borderRadius: '4px',
                    height: '32px',
                    width: '32px',
                    '&:hover': {
                        color: '#fff'
                    }
                }}
            >
                <InsertLinkIcon />
            </IconButton>
        </div>
    )
}

export default MessengerControlBar
