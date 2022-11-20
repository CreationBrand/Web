/** @jsxImportSource @emotion/react */


import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { bold, heading3, smMuted, xsMuted } from "Stories/Text/Text";
import { Link } from "react-router-dom";
import ImageEditor from "Stories/ImageEditor/ImageEditor";
import ProfilePopup from "Stories/ProfilePopup/ProfilePopup";
import { useRecoilValue } from "recoil";
import { communityData, sessionData } from "State/Data";
import Grid from "@mui/system/Unstable_Grid";
import { css } from "@emotion/react";

import { Button, Divider, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import theme from 'Global/Theme';
import { contentFlow } from 'State/Flow';



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


const CommunitySettings = () => {
    const community:any = useRecoilValue(contentFlow)

    console.log(community)


    const [value, setValue] = useState('Profile');
    const handleChange = (e: any, v: any) => setValue(v);

    if (!community) return null

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


                                <div css={[C.title, heading3]}>Community Public</div>

                                <div css={C.paper}>

                                    <div css={C.field}>
                                        <div>
                                            <div css={smMuted}>Community Name</div>
                                            <div css={bold}>{community.title}</div>
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

                                    <ImageEditor api='community' id={community.public_id} type='avatar' width={80} height={80} />
                                    <ImageEditor api='community' id={community.public_id} type='banner' width={600} height={200} />


                                </div>

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




export default CommunitySettings