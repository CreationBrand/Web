/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { useState } from "react";

import { motion } from "framer-motion"
import { textNormal } from "Global/Mixins"
import EditGroup from "Stories/Popups/EditGroup"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';


const C = {
    inner: css({
        flexGrow: 1,
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        height: '40px',
        padding: '8px',
    }),
    group: css({
        height: '40px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        color: '#d7dadc',
        fontSize: '10px !important',
    }),
}

const innerMotion = {
    rest: { background: '#181820' },
    hover: {
        background: '#272732',
        ease: "easeIn",
    }
};


const Group = ({ node, editOpen }: any) => {


    const handleEdit = () => { editOpen(node) }
    const handleGroup = () => node.toggle()


    return (
        <motion.div css={C.group}>

            <div css={{ height: '18px' }}>
                {node.isOpen ? <IndeterminateCheckBoxOutlinedIcon sx={{ fontSize: '18px' }} /> : <AddBoxOutlinedIcon sx={{ fontSize: '18px' }} />}
            </div>

            <motion.div initial="rest" whileHover="hover" css={[C.inner, { justifyContent: 'space-between' }]} variants={innerMotion} >

                <div css={[{ color: "#" + node.data?.object?.color?.toString(16) + '!important', marginBottom: '0px !important' }, textNormal('s')]}>
                    {node.data.object.title}
                </div>


                <SettingsOutlinedIcon onClick={handleEdit} sx={{ fontSize: '14px' }} />

            </motion.div>

        </motion.div >

    )
}




export default Group