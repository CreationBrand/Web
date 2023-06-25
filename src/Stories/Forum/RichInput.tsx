/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';

import Editor from "Stories/Bits/Editor/Editor";
import { Controller } from "react-hook-form";

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';


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
                    {maxLength &&
                        <div css={{
                            position: 'absolute',
                            bottom: '16px',
                            right: '8px',
                            color: '#b9b6ba',
                            marginLeft: '8px',
                            fontSize: '12px'
                        }}>{value.length}/{maxLength}</div>}
                </div>

                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => <p css={{
                        marginTop: '4px',
                        color: '#c84b4b',
                        fontSize: '14px',
                        fontWeight: 400,
                        fontFamily: 'noto sans',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}><ErrorOutlineRoundedIcon />{message}</p>} /></>
        )}
    />)
};

export default RichInput;