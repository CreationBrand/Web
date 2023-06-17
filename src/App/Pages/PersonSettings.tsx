/** @jsxImportSource @emotion/react */


import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { bold, heading3, smMuted, xsMuted } from "Stories/Bits/Text/Text";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionData } from "State/Data";
import Grid from "@mui/system/Unstable_Grid";
import { css } from "@emotion/react";

import { Button, Divider, IconButton, Tab, Tabs } from "@mui/material";
import { memo, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import theme from 'Global/Theme';
import ImageEditor from 'Stories/Forum/ImageEditor';



const C = {

    container: css({
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: theme.background.pri,
        display: 'flex',
        padding: '8px',
        gap: '8px',
    }),
    drawer: css({
        height: '100%',
        width: '25%',
        background: theme.background.tri,
        borderRadius: '8px',
        paddingTop: '44px',
        paddingLeft: '22px',
        paddingRight: '22px',
        gap: '8px',
    }),
    content: css({
        height: '100%',
        width: '75%',
        background: theme.background.sec,
        borderRadius: '8px',
        paddingTop: '44px'
    }),
    center: css({
        margin: 'auto',


    }),
    paper: css({
        background: theme.background.tri,
        borderRadius: '8px',
        width: '100%',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',

    }),
    return: css({
        position: 'absolute',
        top: '22px',
        right: '22px',
    }),
    field: css({
        display: 'flex',
        justifyContent: 'space-between',
    }),
    title: css({
        marginBottom: '22px'
    })

}


const Settings = () => {
    const session = useRecoilValue(sessionData)

    console.log(session)
    const [value, setValue] = useState('Profile');
    const handleChange = (e: any, v: any) => setValue(v);

    return (
        <div css={C.container}>
            <TabContext value={value}>

                <div css={C.drawer}>


                    <TabList onChange={handleChange}
                        orientation="vertical">
                        <Tab label="Item One" value="Profile" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>


                </div>

                <div css={C.content}>


                    <TabPanel value="Profile">

                        <Grid container justifyContent='center' >
                            <Grid md={6} >


                                <div css={[C.title, heading3]}>My Profile</div>

                                <div css={C.paper}>

                                    <div css={C.field}>
                                        <div>
                                            <div css={smMuted}>Username</div>
                                            <div css={bold}>Badwithawp</div>
                                        </div>
                                        <Button size="small" color='tri' variant="contained">Edit</Button>
                                    </div>

                                    <div css={C.field}>
                                        <div>
                                            <div css={smMuted}>Email</div>
                                            <div css={bold}>Isaacman090@gmail.com</div>
                                        </div>
                                        <Button size="small" color='tri' variant="contained">Edit</Button>
                                    </div>


                                    <div css={C.field}>
                                        <div>
                                            <div css={smMuted}>Password</div>
                                            <div css={bold}>*************</div>
                                        </div>
                                        <Button size="small" color='tri' variant="contained">Edit</Button>
                                    </div>

                                    <ImageEditor api='user/upload' type='avatar' width={60} height={60} />
                                    <ImageEditor api='user/upload' type='banner' width={300} height={80} />


                                </div>
                                {/* <ProfilePopup username={session.username} /> */}

                            </Grid>
                        </Grid>
                        {/* </div> */}

                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>





                </div>


                <div css={C.return}>
                    <Link to="/home">
                        <IconButton aria-label="back" size="large">
                            <KeyboardReturnRoundedIcon />
                        </IconButton>
                    </Link>
                </div>


            </TabContext>
        </div>

    )
}




export default memo(Settings)