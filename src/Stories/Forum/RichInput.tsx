/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import Editor from "Stories/Bits/Editor/Editor";
import { Controller } from "react-hook-form";



const RichInput = ({ control, maxLength, name, defaultValue }: any) => {

    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ''}
        render={({ field: { onChange, value }, formState: { errors } }) => (
            <>
                <div css={{
                    background: '#181820', borderRadius: 8, padding: 8, position: 'relative',
                    border: Boolean(errors[name]) ? '2px solid #c84b4b !important' : '2px solid #181820',
                    '&:focus-within': {
                        border: '2px solid #996ccc'
                    }
                }}>
                    <Editor value={value} onChange={onChange}></Editor>
                    <div css={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '8px',
                        color: '#b9b6ba',
                        marginLeft: '8px',
                        fontSize: '12px'
                    }}>{value.length}/{maxLength}</div>
                </div>

                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => <p css={{
                        marginTop: '2px',
                        color: '#c84b4b',
                        fontSize: '12px',
                        fontWeight: 500,
                        fontFamily: 'noto sans',
                    }}>{message}</p>} /></>
        )}
    />)
};

export default RichInput;