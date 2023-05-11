/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { useState } from "react";

import { motion } from "framer-motion"
import { textBold, textNormal } from "Global/Mixins"
import EditGroup from "Stories/Popups/EditGroup"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const C = {
    inner: css([textBold('s'), {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        whiteSpace: 'nowrap',
    }]),
    group: css({
        padding: '8px',
        borderRadius: '8px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        color: '#d7dadc',
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

    const navigate = useNavigate()

    const handleEdit = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        editOpen(node)
    }
    const handleGroup = () => node.toggle()
    const handleNav = () => navigate(node.data.link)

    return (
        <motion.div css={C.group} initial="rest" whileHover="hover" variants={innerMotion} >

            <div css={{
                height: '18px',
                cursor: 'pointer',
                fill: '#b9bbbe',
                '&:hover': {
                    fill: '#fff !important',
                }
            }}>

                {node.children === null ? <CheckBoxOutlineBlankIcon onClick={handleGroup} sx={{ fontSize: '18px', fill: 'inherit' }} /> :
                    node.isOpen ? <IndeterminateCheckBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '18px', fill: 'inherit' }} />
                        : <AddBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '18px', fill: 'inherit' }} />
                }




            </div>

            <motion.div css={C.inner} onClick={handleNav}>
                <div css={[{ color: "#" + node.data?.object?.color?.toString(16) + '!important', marginBottom: '0px !important' }]}>
                    {node.data.object.title}
                </div>
                <SettingsOutlinedIcon onClick={handleEdit} sx={{
                    fontSize: '18px', fill: '#b9bbbe', '&:hover': {
                        fill: '#fff !important',
                    }
                }} />

            </motion.div>



        </motion.div >

    )
}




export default Group