/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useState } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"



const C = {
    container: css({
        width: '100%',
        height: '1000px',
        maxHeight: '400px',
        minHeight: '200px',
        position: 'relative',
    }),
    float: css({
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        overflow: "hidden",
        position: "absolute",
        pointerEvents: "auto",
        left: "50%",
        top: "unset",
        transform: "translateX(-50%)",
        flexDirection: "row",
        bottom: "20px",
        gap: "12px",
        padding: "0px 16px",
        height: "30px",
        width: "auto",
        borderRadius: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)"
    }),
    dot: css({
        borderRadius: "50%",
        background: "#5d6066",
        cursor: "pointer",
        border: "none",
        placeContent: "center",
        placeItems: "center",
        width: "8px",
        height: "8px",
        opacity: 1
    }),
}

const sliderVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        scale: 1.2,
        opacity: 0
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        scale: 1,
        opacity: 0.2
    })
}

const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04]
}

const Carousel = ({ images }: any) => {

    const [[imageCount, direction], setImageCount] = useState([0, 0])
    const [index, setIndex] = useState(0)
    const dots = Array(images.length).fill(0);


    if (images.length === 0) return null

    const move = (to: number) => {
        setIndex(to)
    }

    console.log(images)

    let url = `https://artram.s3.amazonaws.com/images/${images[index]}.jpeg`
    let url2 = `url(${images[index]}.jpeg)`


    return (

        <div css={C.container}>


            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    css={{
                        border: '1px solid #272732',
                        display: "block",
                        height: "100%",
                        width: "100%",
                        borderRadius: "12px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundImage:`url(${images[index]})`,
                    }}
                    key={imageCount}
                    custom={direction}
                    variants={sliderVariants}
                    initial="incoming"
                    animate="active"
                    exit="exit"
                    transition={sliderTransition}
                    dragElastic={1}

                />
            </AnimatePresence>

            <div css={C.float}>
                {dots.map((_, i) => (<div css={[C.dot, i === index && { background: '#fff' }]} onClick={() => move(i)} />))}
            </div>

        </div>
    )
}

export default Carousel
