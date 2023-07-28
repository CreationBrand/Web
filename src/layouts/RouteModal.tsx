
/** @jsxImportSource @emotion/react */
import { layoutSize } from '@/state/layout';
import { css } from '@emotion/react';
import { Modal } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { bg_3 } from '@/global/var';


const C = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        // width: "800px",
        overflow: "hidden",
        color: '#fff',
        background: bg_3,
        display: "flex",
        height: "auto",
        margin: "0 auto",
        borderRadius: "24px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",

        '@media only screen and (max-width: 800px)': {
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '110px 0px 40px',
        }

    }),

    close: css({
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: '#b6bbbf',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff'
        },

    }),
}

const RouteModal = ({ children }: any) => {

    const navigate = useNavigate()
    const onClose = () => navigate(-1)
    const layout = useRecoilValue(layoutSize)

    return <Modal open={true} onClose={onClose} css={C.container} >
        <div css={C.popup}>

            <div
                onClick={onClose}
                css={{
                    cursor: "pointer",
                    position: layout === 'mobile' ? "absolute" : "fixed",
                    top: layout === 'mobile' ? "8px" : "40px",
                    right: layout === 'mobile' ? "8px" : "56px",
                    zIndex: 4,
                    width: "44px",
                    height: "44px",
                    border: "2px solid #2C2C2C",
                    borderRadius: "50%",
                    fontSize: "0",
                    WebkitTransition: "border-color .2s",
                    transition: "border-color .2s",
                    '&:hover': {
                        borderColor: '#fff'
                    },
                }}>
                <CloseRoundedIcon sx={{
                    position: "relative",
                    top: "6px",
                    left: "6px",
                    color: "#adb7be",
                    fontSize: "28px",
                }} />
            </div>

            {children}

        </div>
    </Modal >
}


export default memo(RouteModal);