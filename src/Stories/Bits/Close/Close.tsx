/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Close = ({ onClose }: any) => {

    return (
        <div
            onClick={onClose}
            css={{
                cursor: "pointer",
                position: "fixed",
                top: "40px",
                right: "56px",
                zIndex: 10000,
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
    )

}


export default Close