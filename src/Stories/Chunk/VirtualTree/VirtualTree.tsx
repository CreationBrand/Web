/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { textBold, textLabel, textLight, textNormal } from "Global/Mixins";
import { motion } from "framer-motion";


import { Tree } from "react-arborist";
import { useLocation, useNavigate } from "react-router-dom";

// ICONS
import Avatar from "Stories/Bits/Avatar/Avatar";
import Group from "./Group";
import { useState } from "react";
import EditGroup from "Stories/Popups/EditGroup";

const VirtualTree = ({ tree, term, operator, setTree, handleMove, height }: any) => {


    const [edit, setEdit] = useState(null)




    const navigate = useNavigate()
    const location = useLocation()

    const onMove = ({ dragIds, parentId, index }: any) => {
        console.log(dragIds, parentId, index)
    };


    const editOpen = (e: any) => setEdit(e.data.object)
    const editClose = () => setEdit(null)



    const Node = ({ node, style, dragHandle }: any) => {


        const handleClick = () => {
            // console.log(node.data)
            if (node.data.link) navigate(node.data.link)
        }

        const handleGroup = () => {
            node.toggle()
            // closeGroup(node.data.path, tree, setTree)
        }


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
            branch: css([textBold('t'), {
                height: '40px',
                display: 'flex',
                alignItems: 'end',
                width: '100%',
                letterSpacing: '0.5px',
                color: '#919597',
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

        else if (node.data.type === 'group') return <Group node={node} editOpen={editOpen} />



        else if (node.data.type === 'branch') return (
            <motion.div
                onClick={handleClick} initial="rest" whileHover="hover" animate="rest" css={C.branch} style={style} ref={dragHandle}>
                {node.data.title}
            </motion.div>)


        else if (node.data.type === 'leaf') return (
            <motion.div
                ref={dragHandle}
                onClick={handleClick}
                initial="rest"
                whileHover="hover"
                animate={location.pathname === node.data.link ? "active" : "rest"}
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
        <>
            <EditGroup group={edit} handleClose={editClose} />
            <Tree
                onMove={onMove}
                className="vitual-tree"
                css={{ flexGrow: 1, height: '100%' }}
                data={tree}
                searchTerm={term}
                searchMatch={operator ? operator :
                    //@ts-ignore
                    (node, term): any => node.data.term.toLowerCase().includes(term.toLowerCase())
                }
                idAccessor={(node: any) => node.path}
                width={'100%'}
                height={height}
                rowHeight={44}
            >
                {Node}
            </Tree>
        </>
    );

}
export default VirtualTree


