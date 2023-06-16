/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Input } from '@mui/material';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';



const FlatInput = ({ control, maxLength, name }: any) => {

    if (!control) return null

    return (<Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field: { onChange, value }, formState: { errors } }) => {
            return (
                <>
                    <Input
                        autoComplete="off"
                        onChange={onChange}
                        value={value}
                        disableUnderline
                        fullWidth
                        sx={{
                            '&:hover': {
                                border: '2px solid #181820'
                            },
                            
                            '&:focus-within': {
                                border: '2px solid #996ccc'
                            },
                            height: "42px",
                            background: '#181820',
                            borderRadius: '8px',
                            padding: '8px',
                            position: 'relative',
                            border: Boolean(errors[name]) ? '2px solid #c84b4b !important' : '2px solid #181820',
                        }}
                        endAdornment={<div css={{
                            color: '#b9b6ba',
                            marginRight: '8px',
                            fontSize: '12px',
                        }}>{value.length}/{maxLength}</div>} />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => <p css={{
                            marginTop: '2px',
                            color: '#c84b4b',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: 'noto sans',
                        }}>{message}</p>} />
                </>

            )
        }}
    />)
};

export default FlatInput;