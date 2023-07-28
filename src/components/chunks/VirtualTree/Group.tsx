/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { memo } from "react";


import { Link, useLocation } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';

import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';

import { bg_1, bg_2, bg_3, bg_active, bg_hover } from "@/global/var";

const C = {
    inner: css({
        fontSize: '13px',
        fontWeight: 700,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        textDecorationThickness: '2px !important',
        textDecorationSkip: 'none !important',
        textDecorationColor: 'currentColor !important',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },

    }),
    group: css({
        cursor: 'pointer',
        padding: '0px 8px 0px 4px',
        borderRadius: '8px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        width: '100%',
        color: '#d7dadc',
        '&:hover': {
            background: bg_hover,
        },
    }),
    icon: css({
        height: '27px',
        cursor: 'pointer',
        fill: '#b9bbbe',
        '&:hover': {
            fill: '#fff !important',
        }
    }),
}


const Group = ({ node, onEdit }: any) => {

    const location = useLocation()

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

            <div css={C.group}
                style={{
                    background: location.pathname === node.data.link ? bg_active : bg_2,
                }}
            >
                <div css={C.icon}>
                    {node.children === null ? <LastPageRoundedIcon sx={{ fontSize: '28px', fill: 'inherit' }} /> :
                        node.isOpen ? <ExpandLessRoundedIcon onClick={handleGroup} sx={{ fontSize: '28px', fill: 'inherit' }} />
                            : <ExpandMoreRoundedIcon onClick={handleGroup} sx={{ fontSize: '28px', fill: 'inherit' }} />
                    }
                </div>

                <div css={C.inner} style={{ color: "#" + node.data?.object?.color?.toString(16) }}>

                    {node.data.object.title}


                    {!node.data.object.base && <MoreVertRoundedIcon onClick={handleEdit} sx={{
                        fontSize: '18px', fill: '#b9bbbe', '&:hover': {
                            fill: '#fff !important',
                        }
                    }} />
                    }
                </div>
            </div >
        </Link >

    )
}




export default memo(Group)