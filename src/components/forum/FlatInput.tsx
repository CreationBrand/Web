/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Input } from '@mui/material';
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { accent, bg_1, bg_2 } from '@/global/var';


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
                            fontFamily:'system-ui',
                            '&:hover': {
                                border: `2px solid ${bg_2}`
                            },
                            '&:focus-within': {
                                border: `2px solid ${accent}`
                            },
                            height: "40px",
                            background: bg_2,
                            borderRadius: '8px',
                            position: 'relative',

                            border: Boolean(errors[name]) ? '2px solid #c84b4b !important' : `2px solid ${bg_2}`,
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
                        render={({ message }) => <div css={{
                            marginTop: '2px',
                            color: '#c84b4b',
                            fontSize: '12px',
                            fontWeight: 400,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            position: 'absolute',
                        
                        }}>
                            <ErrorOutlineRoundedIcon sx={{fontSize:'18px'}} />{message}</div>} />
                </>

            )
        }}
    />)
};

export default FlatInput;