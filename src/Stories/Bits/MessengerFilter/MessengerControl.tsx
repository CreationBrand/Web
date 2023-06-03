/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, ButtonGroup, Input } from '@mui/material'
import { ManageSearchRounded } from '@mui/icons-material'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import EmailIcon from '@mui/icons-material/Email';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { socketRequest } from 'Service/Socket';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { virtualListStateFamily } from 'State/Data';

const C = {
    container: css({
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '2px',
        borderRadius: '8px',
        zIndex: 1000,
        gap: '8px',
        fontSize: '24px',
        // rotate: '180deg',
    }),

}
const MessengerControl = ({ messenger_id }: any) => {

    const [isasdf, set]: any = useRecoilState(virtualListStateFamily(`messenger:${messenger_id}`))




    const handleAccept = async () => {
        let res: any = await socketRequest('messenger-accept', { messenger_id })
        if (res.status === 'ok') {
            set((prev: any) => ({ ...prev, status: 'active' }))
        }
    }

    const handleClose = async () => {
        let res: any = await socketRequest('messenger-close', { messenger_id })
        if (res.status === 'ok') {
            set((prev: any) => false)
        }
    }

    const handleBlock = async () => {
        let res: any = await socketRequest('messenger-block', { messenger_id })
        if (res.status === 'ok') {
            set((prev: any) => ({ ...prev, status: 'block' }))
        }
    }


    return (
        <div css={C.container}>


            <Button
                disableElevation
                onClick={handleAccept}
                color='success'
                sx={{
                    // backgroundColor: '#605d57',
                    background: '#181820 !important',
                    color: '#b9bbbe',
                    borderRadius: '8px',
                    gap: '8px',
                    '&:hover': {
                        backgroundColor: '#22222e !important',

                    },
                }}
                variant="contained">

                <CheckRoundedIcon />
                Accept
            </Button>


            <Button
                disableElevation
                onClick={handleClose}

                sx={{
                    background: '#181820 !important',
                    color: '#b9bbbe',
                    borderRadius: '8px',
                    gap: '8px',
                    '&:hover': {
                        backgroundColor: '#22222e !important',

                    },
                }}
                variant="contained">

                <CloseRoundedIcon />
                Close
            </Button>

            <Button
                disableElevation
                onClick={handleBlock}
                color='error'
                sx={{
                    background: '#181820 !important',
                    color: '#b9bbbe',
                    borderRadius: '8px',
                    gap: '8px',
                    '&:hover': {
                        backgroundColor: '#22222e !important',

                    },
                }}
                variant="contained">

                <RemoveCircleOutlineRoundedIcon />
                Block
            </Button>



        </div>
    )
}

export default MessengerControl
