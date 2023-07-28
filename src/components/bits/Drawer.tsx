/** @jsxImportSource @emotion/react */
import { bg_2 } from '@/global/var';
import { css } from '@emotion/react'

import { Global } from '@emotion/react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;


export default function Drawer({ open, setOpen, children, ...props }: any) {
    const { window } = props;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <SwipeableDrawer
                sx={{
                    background: 'transparent',
                    '.MuiDrawer-paper': {
                        background: 'transparent !important',
                        padding: '0px !important',
                        boxShadow: 'none !important',
                    }
                }}
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >

                <div
                    css={{
                        width: 60,
                        height: 6,
                        backgroundColor: '#f2f4f5',
                        borderRadius: 8,
                        position: 'absolute',
                        top: 8,
                        left: 'calc(50% - 30px)',
                    }}
                />


                <div
                    css={{
                        borderRadius: '16px 16px 0px 0px',
                        marginTop: '22px',
                        background: bg_2,
                        height: '100%',
                        minHeight: '40vh',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0px 10px 12px 10px rgba(0,0,0,0.9)',
                        fontWeight: 600,
                        fontsize: '16px',
                    }}
                >
                    {children}
                </div>
            </SwipeableDrawer>
        </>
    );
}