/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Button, Modal, IconButton, InputAdornment } from "@mui/material"
import { useEffect, useState } from "react";

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { authFlow } from "@/state/flow";
import { layoutSize } from "@/state/layout";
import { loginCognito, signUpCognito, verifyEmail, reSendCode } from "@/service/Cognito";
import FlatInput from "../forum/FlatInput";
//@ts-ignore
import src from '@/assets/OIG.webp';
import RouteModal from "@/layouts/RouteModal";
import { forumLabel } from '@/global/mixins';

const C = {
    image: css({
        overflow: "hidden",
        flex: '0 50%',
        '@media only screen and (max-width: 800px)': {
            display: 'none'
        }
    }),
    form: css({
        padding: '40px 40px 32px',
        flex: '0 50%',

        '@media only screen and (max-width: 800px)': {
            flex: '0 100%',
            padding: '0px',
        }
    }),
}

const signupSchema = Joi.object({
    username: Joi.string().min(5).max(22).trim().strict().required().messages({
        'string.empty': 'Username is not allowed to be empty',
        'string.max': 'Username length must be less than or equal to {{#limit}} characters long',
        'string.min': 'Username length must be at least {{#limit}} characters long.',
        'string.trim': 'Username must not have leading or trailing whitespace',
    }),
    password: Joi.string()
        .regex(/[ -~]*[a-z][ -~]*/) // at least 1 lower-case
        .regex(/[ -~]*[A-Z][ -~]*/) // at least 1 upper-case
        .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
        .regex(/[ -~]*[0-9][ -~]*/) // at least 1 number
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least {{#limit}} characters long.',
            'string.empty': 'Password is not allowed to be empty',
            'string.pattern.base': 'Requires one uppercase, lowercase, number and special',
        }),
    email: Joi.string().email({ tlds: { allow: false } }).trim().strict().required().messages({
        'string.email': 'Email must be valid and verifiable',
    }),
})
const loginSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
})
const verifySchema = Joi.object({
    code: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
})

const LoginSignup = () => {

    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('login')

    const { handleSubmit, control, formState: { errors }, reset, watch, setError } = useForm({
        mode: 'onChange',
        resolver: joiResolver((view === 'login') ? (loginSchema) : ((view === 'signup') ? (signupSchema) : (verifySchema)))
    });


    //PASSWORD 
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => event.preventDefault();


    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)

        if (view === 'login') {
            let status = await loginCognito(data.username, data.password)
            console.log('status', status)
            if (status === 'error') setError('username', { type: 'custom', message: 'Invalid username or password' });
            if (status === 'sucess') window.location.reload();
            if (status === 'verify') setView('verify')
        }

        else if (view === 'signup') {
            let status = await signUpCognito(data.username, data.email, data.password)
            
            console.log('status', status)
            if (status === 'User already exists') setError('username', { type: 'custom', message: 'User already exists' });
            if (status === true) setView('verify')
            else setError('username', { type: 'custom', message: 'Invalid username or password' });
        }

        else if (view === 'verify') {
            try {
                let status = await verifyEmail(data.username, data.code)
                if (status) {
                    var request = await loginCognito(data.username, data.password)
                    window.location.reload()
                }
                else setError('code', { type: 'custom', message: 'Invalid code' });
            } catch (e) {

            }
            setLoading(false)

        }

        setLoading(false)
    })

    const enterSubmit = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit()
        }
    }

    return (
        <RouteModal>
            <div css={{
                display: 'flex',
                maxWidth: '800px',
            }}>
                <div css={C.image}>
                    <img css={{ width: '100%', objectFit: "cover", height: '100%' }} src={src}></img>
                </div>


                <AnimatePresence mode="popLayout">



                    {view === 'login' && (
                        <motion.form
                            key="login"
                            transition={{ ease: "easeOut" }}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}

                            css={C.form}>
                            <div css={{
                                textAlign: "center",
                                marginBottom: "26px",
                                fontSize: "28px",
                                fontWeight: 600,
                                lineHeight: "40px",
                            }}>Sign Into Your Account</div>

                            <h3 css={forumLabel}>Username</h3>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (

                                    <Input
                                        error={errors.username ? true : false}
                                        autoComplete="off"
                                        onChange={onChange}
                                        value={value}
                                        disableUnderline
                                        fullWidth
                                        sx={{
                                            height: "42px",
                                            // marginBottom: "px",
                                            '&:hover': {
                                                // border: '2px solid #181820'
                                            },

                                            '&:focus-within': {
                                                border: '2px solid #996ccc'
                                            },
                                        }}
                                    />

                                )}
                            />

                            <h3 css={forumLabel}>Password</h3>

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        onKeyDown={enterSubmit}
                                        type={showPassword ? 'text' : 'password'}
                                        error={errors.password ? true : false}
                                        autoComplete="off"
                                        onChange={onChange}
                                        value={value}
                                        disableUnderline
                                        fullWidth
                                        sx={{
                                            height: "42px",
                                            // marginBottom: "26px",
                                            fontSize: "14px",
                                            '&:hover': {
                                                // border: '2px solid #181820'
                                            },

                                            '&:focus-within': {
                                                border: '2px solid #996ccc'
                                            },
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{ marginRight: "2px", color: '#dbdee1' }}
                                                    disableRipple
                                                    disableFocusRipple
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                )}
                            />

                            <LoadingButton
                                loadingIndicator="Loading…"
                                loading={loading}
                                onClick={onSubmit}
                                variant='contained'
                                fullWidth
                                disableElevation
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    height: "42px",
                                    borderRadius: "8px",
                                    fontSize: "17px",
                                    fontWeight: 600,
                                    lineHeight: "24px",
                                    marginTop: "24px",
                                }}>
                                Sign In
                            </LoadingButton>

                            <div css={{
                                marginTop: "24px",
                                fontSize: "13px",
                                fontWeight: 450,
                                lineHeight: "14px",
                                color: "rgba(255,255,255,0.75)",
                                textAlign: "center"
                            }}>
                                Not Registered? {` `}
                                <span
                                    onClick={() => setView('signup')}
                                    css={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationThickness: '2px',

                                        }
                                    }}>Sign up</span>
                            </div>
                        </motion.form>

                    )}

                    {view === 'signup' && (
                        <motion.form
                            key="signup"
                            transition={{ ease: "easeOut" }}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0 }}

                            css={C.form}>
                            <div css={{
                                textAlign: "center",
                                marginBottom: "26px",
                                fontSize: "28px",
                                fontWeight: 500,
                                lineHeight: "40px",
                            }}>Create Your Account
                            </div>


                            <h3 css={forumLabel}>Username</h3>
                            <FlatInput control={control} name="username" />


                            <h3 css={forumLabel} >Email</h3>
                            <FlatInput control={control} name="email" />


                            <h3 css={forumLabel} >Password</h3>
                            <FlatInput control={control} name="password" type={showPassword ? 'text' : 'password'} />

                            <LoadingButton
                                loadingIndicator="Loading…"
                                loading={loading}
                                onClick={onSubmit}
                                variant='contained'
                                fullWidth
                                disableElevation
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    height: "42px",
                                    borderRadius: "8px",
                                    fontSize: "17px",
                                    fontWeight: 600,
                                    lineHeight: "24px",
                                    marginTop: '24px',

                                }}>
                                Sign Up
                            </LoadingButton>

                            <div css={{
                                marginTop: "24px",
                                fontSize: "13px",
                                fontWeight: 450,
                                lineHeight: "14px",
                                color: "rgba(255,255,255,0.75)",
                                textAlign: "center"
                            }}>
                                Already have an account? {` `}
                                <span
                                    onClick={() => setView('login')}
                                    css={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationThickness: '2px',

                                        }
                                    }}>Sign in</span>
                            </div>
                        </motion.form>
                    )}

                    {view === 'verify' && (
                        <motion.form
                            key="login"
                            transition={{ ease: "easeOut" }}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}

                            css={C.form}>
                            <div css={{
                                marginBottom: "26px",
                                fontSize: "28px",
                                fontWeight: 500,
                                lineHeight: "40px",
                            }}>Enter verification code</div>

                            <h3 css={forumLabel}>Code</h3>
                            <Controller
                                name="code"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        error={errors.code ? true : false}
                                        autoComplete="off"
                                        onChange={onChange}
                                        value={value}
                                        disableUnderline
                                        fullWidth
                                        sx={{
                                            height: "42px",
                                            marginBottom: "26px",
                                        }}
                                    />
                                )}
                            />


                            <LoadingButton
                                loadingIndicator="Loading…"
                                loading={loading}
                                onClick={onSubmit}
                                variant='contained'
                                fullWidth
                                disableElevation
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    height: "42px",
                                    borderRadius: "8px",
                                    fontSize: "17px",
                                    fontWeight: 600,
                                    lineHeight: "24px",

                                }}>
                                Verify Code
                            </LoadingButton>


                            <div css={{
                                marginTop: "24px",
                                fontSize: "13px",
                                fontWeight: 450,
                                lineHeight: "14px",
                                color: "rgba(255,255,255,0.75)",
                                textAlign: "center"
                            }}>
                                Dont see the email? {` `}
                                <span
                                    onClick={() => reSendCode()}
                                    css={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textDecorationThickness: '2px',

                                        }
                                    }}>Resend Code
                                </span>
                            </div>




                        </motion.form>


                    )}

                </AnimatePresence>
            </div>
        </RouteModal>
    )

}


export default LoginSignup
