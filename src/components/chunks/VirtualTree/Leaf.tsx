/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { notificationStateFamily } from "@/state/data";
import { Badge, BadgeProps, styled } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { bg_2, bg_active, bg_hover, text_1 } from "@/global/var";


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        // right: -3,
        top: 6,
        lineHeight: '10px',
        // height: '18px',
        fontWeight: '600',
        // minHeight: '12px',
        fontSize: '10px',
        fontFamily: 'noto sans',
        border: `3px solid #181820`,
        padding: '0px 2px',
        // borderRadius: '8px',
        zIndex: 200,
        background: '#af4141',
    },
}));

const C = {
    leaf: css({
        touchAction: 'pan-y',
        userSelect: 'none',
        height: '40px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        color: '#d7dadc',
    }),
    bulge: css({
        width: '4px',
        height: '40%',
        borderRadius: '8px',
        background: text_1,
    }),
    inner: css({
        flexGrow: 1,
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        maxWidth: 'calc(100% - 12px)',
        height: '40px',
        padding: '8px',
        cursor: 'pointer',

    }),
    title: css({
        color: '#d7dadc',
        fontSize: '16px',
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontWeight: '500',
    }),

}
const bulgeMotion = {
    rest: {
        opacity: 0,
        ease: "easeOut",
        duration: 0.4,
    },
    hover: {
        height: '40%',
        opacity: 1,
        ease: "easeIn",
        duration: 0.2,
    },
    active: {
        height: '80%',
        opacity: 1,
        ease: "easeIn",
        duration: 0.2,
    }

};
const innerMotion = {
    rest: { background: bg_2 },
    hover: { background: bg_hover },
    active: { background: bg_active },
};

const Leaf = ({ link, title, icon, public_id, atom }: any) => {

    const notification = useRecoilValue(notificationStateFamily(public_id))
    const location = useLocation()

    return (
        <Link css={{ all: 'unset' }} to={link}>

            <motion.div
                initial="rest"
                whileHover="hover"
                animate={location.pathname === link ? "active" : "rest"}
                css={C.leaf}>
                <motion.div variants={bulgeMotion} css={C.bulge} />
                <motion.div css={C.inner} variants={innerMotion}>

                    {icon && <StyledBadge badgeContent={notification} invisible={!Boolean(notification)}>
                        {icon}
                    </StyledBadge>}
                    <span css={C.title}>{title}</span>
                </motion.div>
            </motion.div >
        </Link >
    )
}



export default memo(Leaf)