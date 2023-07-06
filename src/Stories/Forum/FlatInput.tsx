/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Input } from '@mui/material';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';


const FlatInput = ({ control, maxLength, name, defaultValue, type }: any) => {

    if (!control) return null

    return (<Controller
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : ''}
        render={({ field: { onChange, value }, formState: { errors } }) => {
            return (
                <>
                    <Input
                        type={type ? type : 'text'}
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
                        endAdornment=
                        {maxLength &&
                            <div css={{
                                color: '#b9b6ba',
                                marginRight: '8px',
                                fontSize: '12px',
                            }}>{value.length}/{maxLength}</div>}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ message }) => <p css={{
                            marginTop: '4px',
                            color: '#c84b4b',
                            fontSize: '14px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <ErrorOutlineRoundedIcon />{message}</p>} />
                </>

            )
        }}
    />)
};

export default FlatInput;