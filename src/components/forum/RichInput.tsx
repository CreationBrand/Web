/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { ErrorMessage } from '@hookform/error-message';
import { Controller } from "react-hook-form";
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Editor from '../chunks/Editor/Editor';
import { accent, bg_2 } from '@/global/var';


const RichInput = ({ control, maxLength, name, defaultValue }: any) => {

    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ''}
        render={({ field: { onChange, value }, formState: { errors } }) => (
            <>
                <div css={{
                    background: bg_2, borderRadius: 8, padding: 8, position: 'relative',
                    border: Boolean(errors[name]) ? '2px solid #c84b4b !important' : `2px solid ${bg_2}`,
                    '&:focus-within': {
                        border: `2px solid ${accent}`
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
                    render={({ message }) => <div css={{
                        marginTop: '1px',
                        color: '#c84b4b',
                        fontSize: '12px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        position: 'absolute',

                    }}>
                        <ErrorOutlineRoundedIcon sx={{ fontSize: '18px' }} />{message}</div>} />
            </>
        )} />
    )
};

export default RichInput;