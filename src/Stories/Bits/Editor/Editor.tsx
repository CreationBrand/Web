/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { layoutSizeData } from 'State/Data'
import ReactQuill from 'react-quill'
import { useRecoilValue } from 'recoil'
import "quill-mention";
import { socketRequest } from 'Service/Socket';
import 'quill/dist/quill.snow.css';
import throttle from 'Util/throttle';

import './mention'


const C = {
    container: css({
        background: '#0e0e10',

    }),
    editor: css({
        background: '#272732',
        // padding: '8px',
        fontFamily: 'noto sans',
        color: 'white',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column-reverse',
        // padding: '0px',

        '.ql-blank': {
            '&::before': {
                fontFamily: 'noto sans',
                fontSize: '12px',
                color: '#bcbdbe',
                left: '0px',
            }
        },

        '.ql-toolbar': {
            borderRadius: '8px',
            width: 'fit-content',
            padding: '4px',
            marginTop: '4px',
            // margin: '4px',
            border: 'none',
            background: '#3b3b4b',
        },
        '.ql-formats': {
            paddingRight: '4px',
            paddingLeft: '4px',
            marginRight: '0px !important',
            borderRight: '2px solid #4a484c',
            '&:last-child': {
                borderRight: 'none',

            },
        },

        '.ql-container': {

            border: 'none',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
        },

        '.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter': {
            color: '#996ccc !important',
        },
        '.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter ': {
            stroke: '#996ccc !important',
        },
        '.ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill': {
            fill: '#996ccc !important',

        },

        '.ql-fill': {
            fill: '#b8babd',
        },
        '.ql-stroke': {
            stroke: '#bcbdbe'
        },
        '.ql-picker': {
            color: '#bcbdbe'
        },
        '.ql-snow': {
            border: 'none'
        },
        '.ql-editor': {
            minHeight: '24px !important',
            borderRadius: '8px',
            padding: '0px 0px',
        },
        '.ql-tooltip': {
            background: '#0f0e10',
            // zIndex: 500,
            // position:'relative',
        }

    })
}

const search = throttle(async (searchTerm: any, renderList: any, mentionChar: any) => {
    let values: any;

    if (mentionChar === "@") {
        let res: any = await socketRequest('mention-person', { query: searchTerm });
        values = res.persons;
    } else if (mentionChar === "#") {
        let res: any = await socketRequest('mention-community', { query: searchTerm });
        values = res.communitys;
    }

    if (searchTerm.length === 0) {
        renderList(values, searchTerm);
    }

    else {
        const matches = [];
        if (values.length === 0) return
        for (let i = 0; i < values.length; i++) {

            if (mentionChar === "@") {
                matches.push({
                    id: values[i].public_id,
                    value: values[i].username,
                    link: `/p/${values[i].public_id}`,
                    text: values[i].username,
                });
            } else if (mentionChar === "#") {
                matches.push({
                    id: values[i].public_id,
                    value: values[i].title,
                    link: `/c/${values[i].public_id}`,
                    text: values[i].title,
                });
            }
        }
        renderList(matches);
    }
}, 200)

let desktop = {
    toolbar: [
        [{ 'header': 1 }],
        ['bold', 'italic', 'underline', 'strike', 'link'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
    mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        dataAttributes: ['id', 'value', 'link', 'denotationChar', 'text'],
        source: search,
        renderItem: function (item: any, searchTerm: any) {
            return item.value
        },
        blobName: 'mention2',
    },

}


const formats: any = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'link',
    'mention',
]

const mobile = {
    toolbar: [
        [{ 'header': 1 }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
    ],
    mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        dataAttributes: ['id', 'value', 'link', 'denotationChar', 'text'],
        source: search,
        renderItem: function (item: any, searchTerm: any) {
            return item.value
        },
        blobName: 'mention2',
    },
}




const Editor = ({ value, onChange, lock, placeholder, disabled }: any) => {

    const layout = useRecoilValue(layoutSizeData)

    return (

        <ReactQuill
            readOnly={disabled}
            preserveWhitespace
            id={'text'}
            css={[
                C.editor,
                lock && { height: lock }
            ]}
            formats={formats}
            modules={layout === 'mobile' ? mobile : desktop}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )



}

export default Editor
