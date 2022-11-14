import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
import { errorFlow } from "State/Flow";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";



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
        <Snackbar open={active}
            autoHideDuration={1000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error.message}
            </Alert>
        </Snackbar>

    </div>
}


export default Error