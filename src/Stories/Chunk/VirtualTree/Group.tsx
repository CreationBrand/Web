/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { memo } from "react";
import { motion } from "framer-motion"
import { textBold, textNormal } from "Global/Mixins"
import EditGroup from "Stories/Popups/EditGroup"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const C = {
    inner: css({
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',

        touchAction: 'none',
        userSelect: 'none',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        whiteSpace: 'nowrap',

    }),
    group: css({
        cursor: 'pointer',
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


const Group = ({ node, onEdit }: any) => {

    const navigate = useNavigate()

    const handleEdit = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        onEdit(node)
    }
    const handleGroup = () => node.toggle()
    const handleNav = () => {
        if (node.data.object.base) return
        navigate(node.data.link)
    }



    return (
        <motion.div css={C.group} initial="rest" whileHover="hover" variants={innerMotion} >



            <div css={{
                height: '20px',
                cursor: 'pointer',
                fill: '#b9bbbe',
                '&:hover': {
                    fill: '#fff !important',
                }
            }}>

                {node.children === null ? <CheckBoxOutlineBlankIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} /> :
                    node.isOpen ? <IndeterminateCheckBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} />
                        : <AddBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} />
                }




            </div>

            <motion.div css={C.inner} onClick={handleNav}>

                <div css={{ color: "#" + node.data?.object?.color?.toString(16) + '!important' }}>
                    {node.data.object.title}
                </div>

                {!node.data.object.base && <SettingsOutlinedIcon onClick={handleEdit} sx={{
                    fontSize: '18px', fill: '#b9bbbe', '&:hover': {
                        fill: '#fff !important',
                    }
                }} />
                }
            </motion.div>



        </motion.div >

    )
}




export default memo(Group)