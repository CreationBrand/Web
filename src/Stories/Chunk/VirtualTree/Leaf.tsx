
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { textNormal } from "Global/Mixins";
import Avatar from "Stories/Bits/Avatar/Avatar";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";



const C = {

    leaf: css([textNormal('s'), {
        height: '40px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        color: '#d7dadc',
    }]),
    bulge: css({
        width: '4px',
        height: '40%',
        borderRadius: '8px',
        background: '#bcbdbe',
    }),
    inner: css({
        flexGrow: 1,
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
        height: '40px',
        padding: '8px',
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        cursor: 'pointer',
    }),

}
const bulgeMotion = {
    rest: { opacity: 0, ease: "easeOut", duration: 0.4, },
    hover: {
        height: '40%',
        opacity: 1,
        ease: "easeIn",
        duration: 0.2,
        type: "tween",
        scale: [1, 1.2, 1],
    },
    active: {
        height: '80%',
        opacity: 1,
        ease: "easeIn",
        duration: 0.2,
        type: "tween",
        scale: [1, 1.2, 1],
    }

};
const innerMotion = {
    rest: { background: '#181820' },
    hover: {
        background: '#272732',
        ease: "easeIn",
    }
};

const Leaf = ({ link, title, icon }: any) => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        if (link) navigate(link)
    }


    return (
        <motion.div
            onClick={handleClick}
            initial="rest"
            whileHover="hover"
            animate={location.pathname === link ? "active" : "rest"}
            css={C.leaf}>

            <motion.div variants={bulgeMotion} css={C.bulge} />
            <motion.div css={C.inner} variants={innerMotion}>

                {icon && icon}

                <p css={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>{title}</p>

            </motion.div>

        </motion.div >)
}



export default Leaf