/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Select, {
    selectClasses,
    SelectProps,
    SelectRootSlotProps,
} from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { useRecoilValue } from 'recoil';
import { forwardRef, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { communityList } from '@/state/person';
import Avatar from '../bits/Avatar';
import { Autocomplete, InputBase, TextField } from '@mui/material';
import { bg_1, bg_2, bg_active, bg_forum, bg_hover } from '@/global/var';
import { layoutSize } from '@/state/layout';


const CommunityPicker = ({ control, name }: any) => {
    const communitys: any = useRecoilValue(communityList)
    const layout = useRecoilValue(layoutSize)
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
                <>
                    <Autocomplete
                        value={value}
                        onChange={(_, newValue) => { onChange(newValue.public_id) }}
                        sx={{
                            width: layout === 'mobile' ? '100%' : 300,
                            background: bg_forum,
                            borderRadius: '8px',
                            height: '40px',
                            FormControl: {
                                background: bg_forum,
                                borderRadius: '8px',
                                height: '40px',
                            },
                            paper: {
                                background: bg_forum,
                            },
                            Popper: {

                                background: bg_forum,
                            },

                        }}
                        options={communitys}
                        // autoHighlight
                        getOptionLabel={(option: any) => option.title}
                        renderOption={(props, option) => (
                            // @ts-ignore
                            <div {...props} css={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                height: '40px',
                                padding: '4px',
                            }}>
                                <Avatar public_id={option.public_id} size={'small'} />
                                <div> {option.title}</div>
                            </div>
                        )}
                        renderInput={(params) => (
                            <TextField
                                variant="filled"
                                {...params}
                                InputProps={{ ...params.InputProps, disableUnderline: true }}
                                sx={{
                                    fontFamily: 'system-ui !important',
                                    '.MuiInputBase-root': {
                                        background: bg_forum,
                                        borderRadius: '8px',
                                        height: '40px',
                                        padding: '0px 8px !important',
                                        borderBottom: '0px !important',
                                        '&:hover': {
                                            background: bg_hover,
                                        },
                                        '&:focus': {
                                            background: bg_active,
                                        },
                                        '&:active': {
                                            background: bg_active,
                                        },
                                        '&:focus-within': {
                                            background: bg_active,
                                        }

                                    },
                                }}
                            />
                        )}
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
                        }}><ErrorOutlineRoundedIcon />
                            {message}</p>} /></>
            )}
        />)

};

export default CommunityPicker;



const CustomSelect = forwardRef(function CustomSelect<
    TValue extends {},
    Multiple extends boolean,
>(props: SelectProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {
    const slots = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    };

    return <Select {...props} ref={ref} slots={slots} />;
});


const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const Button = forwardRef(function Button<
    TValue extends {},
    Multiple extends boolean,
>(
    props: SelectRootSlotProps<TValue, Multiple>,
    ref: React.ForwardedRef<HTMLButtonElement>,
) {
    const { ownerState, ...other } = props;
    return (
        <button type="button" {...other} ref={ref}>
            {other.children}
            <UnfoldMoreRoundedIcon />
        </button>
    );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
    ({ theme }) => `
    font-size: 0.875rem;
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    max-width: 400px;
    padding: 4px 12px;
    border-radius: 8px;
    text-align: left;
    background: #181820;
    border:2px solid #181820;
    
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    position: relative;
   
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: #0f0e10;
      border-color:#996ccc;
    }
  
    &.${selectClasses.focusVisible} {
      border:2px solid #9147ff;
      outline: none;
      }
  
    & > svg {
      font-size: 1rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 8px 0;
    min-width: 320px;
    width: 100%;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    border:2px solid #343442;
    background: #0f0e10;
    max-height: 60vh !important;
    color: #fff;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
);

const StyledOption = styled(Option)(
    ({ theme }) => `
    list-style: none;
    padding: 4px;
    border-radius: 8px;
    cursor: default;
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionClasses.selected} {
      background-color: #272732;
      color: #fff;
    }
  
    &.${optionClasses.highlighted} {
      background-color: #272732;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
  
  
  
    &:hover:not(.${optionClasses.disabled}) {
      background-color: #181820;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
);

const StyledPopper = styled(Popper)`
z-index: 1000;
  `;
