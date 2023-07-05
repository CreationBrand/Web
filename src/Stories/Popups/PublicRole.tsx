
/** @jsxImportSource @emotion/react */

import { Modal, Switch } from "@mui/material"
import { css } from '@emotion/react';
import { useState } from "react";
import { textBold, textLight, } from "Global/Mixins";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { socketRequest } from "Service/Socket";
import { layoutSizeData } from "State/Data";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPublic } from "Service/Rbac";
import { communitySync } from "State/Sync";
import { authFlow } from "State/Flow";

const C = {
    container: css({
        // backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }),
    popup: css({
        width: "424px",
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        height: "auto",
        maxHeight: "100vh",
        overflowY: "scroll",
        margin: "0 auto",
        borderRadius: "8px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",

        '@media only screen and (max-width: 800px)': {
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '80px 0px 0px',
            overflowY: 'scroll',

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
    title: css({
        padding: '16px',
        textAlign: 'center',
    }),
    content: css({
        padding: ' 16px 16px 16px 16px',
    }),

    switch: css({
        display: 'flex',
        background: '#181820',
        borderRadius: '8px',
        padding: '8px 0px 8px 16px',
        justifyContent: 'space-between',
        marginBottom: '8px',
    }),
    switchTitle: css({
        fontSize: '14px',
        fontWeight: 600,
        color: '#f2f3f5'
    }),
}


const PublicRole = ({ value, current, community_id }: any) => {

    const updater = useSetRecoilState(communitySync(community_id))

    const layoutSize = useRecoilValue(layoutSizeData)
    const [open, setOpen] = useState(false);
    const auth = useRecoilValue(authFlow)

    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);


    const onChange = (public_id: any) => {


        if (checkPublicIdExists(current, public_id)) {
            socketRequest('flair-remove-person', { role_id: public_id, community_id: community_id })

            updater((old: any) => {
                return {
                    ...old,
                    community: {
                        ...old.community,
                        your_roles: old.community.your_roles.filter((elem: any) => elem?.public_id !== public_id)
                    }
                }
            })


        } else {
            socketRequest('flair-add-person', { role_id: public_id, community_id: community_id })
            updater((old: any) => {

                let temp = old?.community?.your_roles?.length > 0 ? old?.community.your_roles : []

                return {
                    ...old,
                    community: {
                        ...old.community,
                        your_roles: [...temp, value.find((elem: any) => elem?.public_id === public_id)]
                    }
                }
            })
        }
    }

    if(auth === 'guest') return null

    return (
        <>

            <div
                onClick={onOpen}
                css={{
                    cursor: 'pointer',
                    background: '#181820',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '10px',
                    padding: '2px 8px',
                    height: '18px',
                }}> + Select Public Role</div>


            <Modal open={open} onClose={onClose} css={C.container} >
                <div css={C.popup}>

                    <div
                        onClick={onClose}
                        css={{
                            cursor: "pointer",
                            position: layoutSize === 'mobile' ? "absolute" : "fixed",
                            top: layoutSize === 'mobile' ? "8px" : "40px",
                            right: layoutSize === 'mobile' ? "8px" : "56px",
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
                    <div css={C.title}>
                        <div css={textBold('x')}>Change Flair</div>
                        <div css={textLight('t')}>Community Flairs are purely aesthetic and are attached like roles.</div>
                    </div>

                    <div css={C.content}>

                        {value && value.map((item: any) => {

                            if (!isPublic(item?.permissions)) return


                            return <div css={C.switch} key={item.public_id}>
                                <div>
                                    <div css={C.switchTitle}>{item.title}</div>
                                </div>
                                <Switch
                                    data-test={item.public_id}
                                    checked={
                                        checkPublicIdExists(current, item.public_id)

                                    } onChange={() => onChange(item.public_id)} />
                            </div>


                        })}

                    </div>



                </div>
            </Modal >
        </>

    )

}


export default PublicRole


function checkPublicIdExists(array: any, public_id: any) {
    if (!array) return false;
    for (let i = 0; i < array?.length; i++) {
        if (array[i]?.public_id === public_id) {
            return true; // Public ID exists in the array
        }
    }
    return false; // Public ID does not exist in the array
}
