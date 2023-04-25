/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { textBold, textLight, textNormal } from "Global/Mixins";
import { motion } from "framer-motion";


import { Tree } from "react-arborist";



const VirtualTree = ({ tree, term, operator }: any) => {

    const handleMove = (e: any) => {
        console.log(e)
    }


    return (
        <Tree
            data={tree}
            searchTerm={term}
            searchMatch={operator ? operator :
                //@ts-ignore
                (node, term): any => node.data.term.toLowerCase().includes(term.toLowerCase())
            }
            onMove={handleMove}
            width={'100%'}
            rowHeight={44}
        >
            {Node}
        </Tree>
    );
}

const Node = ({ node, style, dragHandle }: any) => {

    const C = {
        leaf: css([textNormal('s'), {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            color: '#d7dadc',
        }]),
        branch: css([textLight('t'), {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            letterSpacing: '0.5px',
            color: '#d7dadc',
            padding: '8px',
            marginLeft: '8px',
        }]),
        stem: css([textBold('t'), {
            height: '40px',
            display: 'flex',
            fontWeight: '700',
            paddingLeft: '8px',
            alignItems: 'center',
        }]),
        bulge: css({
            width: '4px',
            height: '40%',
            borderRadius: '8px',
            background: '#bcbdbe',
            marginRight: '8px',
        }),
        inner: css({
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
            height: '40px',
            paddingLeft: '8px',
        })
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
        }
    };

    const innerMotion = {
        rest: { background: '#181820' },
        hover: {
            background: '#272732',
            ease: "easeIn",
        }
    };



    if (node.data.isBranch) return (
        <motion.div initial="rest" whileHover="hover" animate="rest"
            css={C.branch} style={style} ref={dragHandle}>
            {node.data.name}
        </motion.div>)


    else if (node.isLeaf) return (
        <motion.div initial="rest" whileHover="hover" animate="rest" css={C.leaf}>

            <motion.div variants={bulgeMotion} css={C.bulge} />

            <motion.div
                css={C.inner}
                variants={innerMotion}
            >
                {node.data.icon}
                {node.data.name}</motion.div>

        </motion.div >)




    return (
        <div>????/</div>
    );
}

export default VirtualTree


/*
branch big bold

*/