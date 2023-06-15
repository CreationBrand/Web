/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
import { errorFlow } from "State/Flow";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { textBold } from 'Global/Mixins';



const Error = () => {

    let error: any = useRecoilValue(errorFlow);
    let [active, setActive] = useState(false)
    const handleClose = () => setActive(false)

    useEffect(() => {
        if (error.type !== null) {
            setActive(true)
        }
    }, [error])

    return <div>
        {/* <Snackbar open={active}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
                width: '100%', maxWidth: '350px',
                fill: 'white !important',
                color: 'white !important',
            }}
            autoHideDuration={14000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error"
                sx={{
                    fill: 'white !important',
                    color: 'white !important',
                    width: '100%', borderRadius: '8px',
                 
                }}>

                <div css={textBold('s')}> {error.message} </div>
            </Alert>
        </Snackbar> */}

    </div >
}


export default Error