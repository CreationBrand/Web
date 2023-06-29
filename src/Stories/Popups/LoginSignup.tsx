/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Button, Modal, IconButton, InputAdornment } from "@mui/material"
import { css } from '@emotion/react';
import { useEffect, useState } from "react";
import { textLabel, } from "Global/Mixins";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authFlow } from "State/Flow";
import { loginCognito, reSendCode, signUpCognito, verifyEmail } from "Service/Cognito";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import FlatInput from "Stories/Forum/FlatInput";
import { layoutSizeData } from "State/Data";

const C = {
    container: css({
        backgroundColor: 'rgba(15,14,16,0.90)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    popup: css({
        width: "800px",
        overflow: "hidden",
        color: '#fff',
        background: '#272732',
        display: "flex",
        height: "auto",
        margin: "0 auto",
        borderRadius: "24px",
        boxShadow: "0px 8px 80px rgba(0,0,0,0.4)",
        // top: "calc(50% - 380px / 2)",

        '@media only screen and (max-width: 800px)': {
            // flex: '0 100%',
            width: '100vw',
            height: '100%',
            borderRadius: '0px',
            padding: '110px 24px 40px',

        }

    }),
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

    close: css({
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: '#b6bbbf',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff'
        },


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
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
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

const LoginSignup = ({ open, onClose }: any) => {

    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('login')
    const [auth, setAuth] = useRecoilState(authFlow)
    const layoutSize = useRecoilValue(layoutSizeData)

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
            if (status === 'error') setError('username', { type: 'custom', message: 'Invalid username or password' });
            if (status === 'sucess') window.location.reload();
            if (status === 'verify') setView('verify')
        }

        else if (view === 'signup') {

            let status = await signUpCognito(data.username, data.password, data.email)
            if (status === 'User already exists') setError('username', { type: 'custom', message: 'User already exists' });
            if (status === true) setView('verify')
            else setError('username', { type: 'custom', message: 'Invalid username or password' });
        }

        else if (view === 'verify') {
            try {
                let status = await verifyEmail(data.code)
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
        <Modal open={open} onClose={onClose} css={C.container} >
            <div css={C.popup}>

                <div
                    onClick={onClose}
                    css={{
                        cursor: "pointer",
                        position: layoutSize === 'mobile' ? "absolute" : "fixed",
                        top: layoutSize === 'mobile' ? "8px" : "40px",
                        right: layoutSize === 'mobile' ? "8px" : "56px",
                        zIndex: 4,
                        width: "44px",
                        height: "44px",
                        border: "2px solid #2C2C2C",
                        borderRadius: "50%",
                        fontSize: "0",
                        WebkitTransition: "border-color .2s",
                        transition: "border-color .2s",
                        '&:hover': {
                            borderColor: '#fff'
                        },
                    }}>
                    <CloseRoundedIcon sx={{
                        position: "relative",
                        top: "6px",
                        left: "6px",
                        color: "#adb7be",
                        fontSize: "28px",
                    }} />
                </div>

                <div css={C.image}>
                    <img css={{ width: '100%', objectFit: "cover", height: '100%' }} src={'OIG.jpg'}></img>
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
                                fontWeight: 450,
                                lineHeight: "40px",
                            }}>Sign Into Your Account</div>

                            <h3 css={textLabel('s')}>Username</h3>
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
                                            marginBottom: "26px",
                                            '&:hover': {
                                                border: '2px solid #181820'
                                            },

                                            '&:focus-within': {
                                                border: '2px solid #996ccc'
                                            },
                                        }}
                                    />

                                )}
                            />

                            <h3 css={textLabel('s')}>Password</h3>

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
                                            marginBottom: "26px",
                                            fontSize: "14px",
                                            '&:hover': {
                                                border: '2px solid #181820'
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
                                fontWeight: 450,
                                lineHeight: "40px",
                            }}>Create Your Account
                            </div>


                            <h3 style={{ marginTop: '16px' }} css={textLabel('s')}>Username</h3>
                            <FlatInput control={control} name="username" />


                            <h3 style={{ marginTop: '16px' }} css={textLabel('s')}>Email</h3>
                            <FlatInput control={control} name="email" />


                            <h3 style={{ marginTop: '16px' }} css={textLabel('s')}>Password</h3>
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
                                fontWeight: 450,
                                lineHeight: "40px",
                            }}>Enter verification code</div>

                            <h3 css={textLabel('s')}>Code</h3>
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
        </Modal >
    )

}


export default LoginSignup



// const usePreventBackNavigation = (open: any, onClose: any) => {
//     const navigate = useNavigate();
//     useEffect(() => {
//         const handleBeforeUnload = (event: any) => {
//             console.log('prevent back', open)
//             if (!open) return;
//             onClose()
//             event.preventDefault();
//             event.returnValue = "";
//             navigate(1);
//             console.log('prevent back')
//         };
//         window.onpopstate = handleBeforeUnload;
//         return () => {
//             window.onpopstate = handleBeforeUnload;
//         };
//     }, [navigate]);

// };