/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"


import { Tree } from "react-arborist";


import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;


function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});



const VirtualTree = ({ data }: any) => {

    const e = [
        { id: "1", name: "Unread" },
        { id: "2", name: "Threads" },
        {
            id: "3",
            name: "Chat Rooms",
            children: [
                { id: "c1", name: "General" },
                { id: "c2", name: "Random" },
                { id: "c3", name: "Open Source Projects" },
            ],
        },
        {
            id: "4",
            name: "Direct Messages",
            children: [
                { id: "d1", name: "Alice" },
                { id: "d2", name: "Bob" },
                { id: "d3", name: "Charlie" },
            ],
        },
    ];

    return (
        <Tree
            data={e}
            // renderRow={Row}
            width={'100%'}
            height={500}
        >
            {Node}
        </Tree>
    );
}

const Row = (props: any) => {
    // console.log(styles, data);
    console.log('row',props)
    const C = {
        container: css({
            height: 'min-content',
            // minHeight: '100px',
            border: "1px solid white",
        }),
    }
    return (
        <div
            ref={props.ref}
            css={C.container}
        >
{props.children}
        </div>
    )
}

const Node = ({ node, style, ...props }: any) => {
    console.log(props);

    const C = {
        container: css({
            // height: '40px',
            border: "1px solid red",
            display: 'flex',
            minHeight: '100px',
            height:`${getRndInteger(100, 500)}px`,
        }),
        depth: css({
            width: `${node.level * 20}px`,

        }),
        thread: css({
            borderRight: '2px solid #343536',
            display: 'block',
            width: '20px',
            height: '100%',
        }),
        icon: css({
            height: '40px',
            width: '40px',
            borderRadius: '8px',
            background: '#0e0e10',
            overflow: 'hidden',
        }),
        content: css({

            display: 'flex',
            padding: '8px 0px 0px 8px',
        }),
    }

    return (
        <div css={C.container} >

            <div css={C.depth}>
            </div>

            <div>
                <div css={C.icon}></div>
                <div css={C.thread} />
            </div>


            <div css={C.content}>



            </div>
            {node.data.id}
            {node.data.name}
            {/* <div style={styles.indent}> */}
            {/* {data.name} */}
            {/* </div> */}
        </div>
    )
}



export default VirtualTree