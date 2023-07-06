/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { memo } from "react";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Link, useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


const C = {
    inner: css({
        fontSize: '14px',
        fontWeight: 600,
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
        '&:hover': {
            background: '#272732',
        },
    }),
    icon: css({
        height: '20px',
        cursor: 'pointer',
        fill: '#b9bbbe',
        '&:hover': {
            fill: '#fff !important',
        }
    }),
}


const Group = ({ node, onEdit }: any) => {

    const handleEdit = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        onEdit(node)
    }

    const handleGroup = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        node.toggle()
    }


    return (
        <Link css={{ all: 'unset' }} to={node.data.object.base ? null : node.data.link}>

            <div css={C.group} >
                <div css={C.icon}>
                    {node.children === null ? <CheckBoxOutlineBlankIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} /> :
                        node.isOpen ? <IndeterminateCheckBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} />
                            : <AddBoxOutlinedIcon onClick={handleGroup} sx={{ fontSize: '20px', fill: 'inherit' }} />
                    }
                </div>

                <div css={C.inner}>
                    <div css={{ color: "#" + node.data?.object?.color?.toString(16) + '!important' }}>
                        {node.data.object.title}
                    </div>

                    {!node.data.object.base && <SettingsOutlinedIcon onClick={handleEdit} sx={{
                        fontSize: '18px', fill: '#b9bbbe', '&:hover': {
                            fill: '#fff !important',
                        }
                    }} />
                    }
                </div>
            </div >
        </Link>

    )
}




export default memo(Group)