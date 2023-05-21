/** @jsxImportSource @emotion/react */

import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Button, Modal, IconButton, InputAdornment } from "@mui/material"
import { css } from '@emotion/react';
import { useState } from "react";
import { textLabel, } from "Global/Mixins";


import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authFlow } from "State/Flow";
import { loginCognito, signUpCognito, verifyEmail } from "Service/Cognito";

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


const LoginSignup = ({ open, handleClose }: any) => {

    const { register, handleSubmit, watch, formState: { errors }, control, setError } = useForm();
    const [loading, setLoading] = useState(false);

    const [auth, setAuth] = useRecoilState(authFlow)

    const [view, setView] = useState('login')

    //PASSWORD 
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => event.preventDefault();
    const navigate = useNavigate()


    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)

        if (view === 'login') {
            let status = await loginCognito(data.username, data.password)
            if (status === 'error') setError('username', { type: 'custom', message: 'Invalid username or password' });
            if (status === 'sucess') window.location.reload();
            if (status === 'verify') setView('verify')
        }

        else if (view === 'signup') {
            console.log('signup')
            let status = await signUpCognito(data.username, data.password, data.email)
            if (status) setView('verify')
            else setError('username', { type: 'custom', message: 'Invalid username or password' });
        }

        else if (view === 'verify') {
            try {
                let status = await verifyEmail(data.code)
                if (status) window.location.reload();
                else setError('code', { type: 'custom', message: 'Invalid code' });
            } catch (e) {

            }
            console.log('update loading')
            setLoading(false)

        }

        console.log(data)
        setLoading(false)
    })






    return (
        <Modal open={open} onClose={handleClose} css={C.container} >
            <div css={C.popup}>

                <div
                    onClick={handleClose}
                    css={{
                        cursor: "pointer",
                        position: "fixed",
                        top: "40px",
                        right: "56px",
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
                                marginBottom: "26px",
                                fontSize: "28px",
                                fontWeight: 450,
                                lineHeight: "40px",
                            }}>Create Your Account
                            </div>

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
                                        }}
                                    />
                                )}
                            />


                            <h3 css={textLabel('s')}>Email</h3>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    pattern:
                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        error={errors.email ? true : false}
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

                            <h3 css={textLabel('s')}>Password</h3>

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
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
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                )}
                            />


                            <span css={{ fontSize: '12px', color: '#f46161' }}>
                                A very cool individual sql inj dropped our DB so we are making some changes. RIP pl/pgsql, Hello Prepared statements</span>
                            <LoadingButton


                                disabled={true}
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
                                it will be open again soon...
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

                        </motion.form>

                    )}



                </AnimatePresence>
            </div>
        </Modal >
    )

}


export default LoginSignup