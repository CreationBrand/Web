/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { textBold, textLight, textNormal } from "Global/Mixins";
import { motion } from "framer-motion";


import { Tree } from "react-arborist";
import { useLocation, useNavigate } from "react-router-dom";

// ICONS
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { closeGroup } from "Helper/Action";
import Avatar from "Stories/Bits/Avatar/Avatar";

const VirtualTree = ({ tree, term, operator, setTree, handleMove }: any) => {


    const navigate = useNavigate()
    const location = useLocation()

    const Node = ({ node, style, dragHandle }: any) => {


        const handleClick = () => {
            if (node.data.link) navigate(node.data.link)
        }

        const handleGroup = () => closeGroup(node.data.path, tree, setTree)



        // STYLES
        const C = {
            right: css({
                flexDirection: 'row-reverse',
                textAlign: 'right',
            }),
            leaf: css([textNormal('s'), {
                height: '40px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                width: '100%',
                color: '#d7dadc',
            }]),
            branch: css([textLight('t'), {
                height: '40px',
                display: 'flex',

                alignItems: 'end',
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
            }),
            inner: css({
                flexGrow: 1,
                borderRadius: '8px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                width: '100%',
                height: '40px',
                paddingLeft: '8px',
            }),
            group: css([textLight('s'), {
                height: '40px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                width: '100%',
                color: '#d7dadc',
            }]),
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






        if (node.data.type === 'component') return node.data.component

        else if (!node.data?.visible) return null


        else if (node.data.type === 'group') return (

            <motion.div onClick={handleGroup}
                initial="rest"
                whileHover="hover"
                css={C.group}>

                <motion.div css={C.inner} variants={innerMotion} >
                    {node.data.active ? <IndeterminateCheckBoxOutlinedIcon sx={{ fontSize: '18px' }} /> : <AddBoxOutlinedIcon sx={{ fontSize: '18px' }} />}
                    {node.data.object.title}
                </motion.div>

            </motion.div >
        )


        else if (node.data.type === 'branch') return (
            <motion.div
                onClick={handleClick} initial="rest" whileHover="hover" animate="rest" css={C.branch} style={style} ref={dragHandle}>
                {node.data.title}
            </motion.div>)


        else if (node.data.type === 'leaf') return (
            <motion.div onClick={handleClick}
                initial="rest"
                whileHover="hover"
                // animate={location.pathname === node.data.object.link ? "active" : "rest"}
                css={C.leaf}>

                <motion.div variants={bulgeMotion} css={C.bulge} />
                <motion.div
                    css={C.inner}
                    variants={innerMotion}
                >
                    {node.data.object?.icon === true ? <Avatar size='small' public_id={node.data.object?.public_id} /> : node.data.object?.icon}
                    {node.data.object?.title}

                </motion.div>

            </motion.div >)



        return (
            <div>????/</div>
        );
    }








    return (
        <Tree
            className="vitual-tree"
            css={{ overflowX: 'hidden' }}
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
export default VirtualTree



interface tree {
    id: string,
    path: string,
    active: boolean,
    visible: boolean,
    children: tree[],
}