/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"


import { Tree } from "react-arborist";


import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const VirtualTree = ({ tree, Node, term, operator }: any) => {

    const handleMove = (e: any) => {
        console.log(e)
    }
    // const temp = useSearchTermString()

    return (
        <Tree
            data={tree}
            // renderRow={Row}
            searchTerm={term}
            searchMatch={operator? operator :
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