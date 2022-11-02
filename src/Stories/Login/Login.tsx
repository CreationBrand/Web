/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Paper'
import { Brand, Label, Link as Accent, Muted } from 'Comps/Base/Text/Text'
import Grid from 'Comps/Unstyled/Grid/Grid'
import { Controller, useForm } from 'react-hook-form'
import { loginCognito } from 'Service/Cognito'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Button, Input } from '@mui/material'

const s = css({
    maxWidth: '400px',
    background: 'green'
})

const Login = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {

        let req = await loginCognito(data.username, data.password, navigate)

        if (!req) {
            setError('username', {
                message: 'Invalid username or password'
            })
            setError('password', {
                message: 'Invalid username or password'
            })
        }
    })

    const handleClick = () => { }

    return (
        <Paper
            so={s}
            width="100%"
            height="min-content"
            background="sec"
            radius="m"
            padding={6}
            elevation={'x'}
        >
            <Grid s={12} gap={5}>
                <Grid s={12} column>
                    <h2 css={Brand}>Artram</h2>
                </Grid>
                <Grid s={12} column>
                    <h3 css={Label}>Username</h3>

                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                error={(errors.username) ? true : false}
                                autoComplete="off"
                                onChange={onChange}
                                value={value}
                                disableUnderline
                                fullWidth
                            />}
                    />

                    {/* <Input
                        error={errors.username ? true : false}
                        control={register('username', { required: true })}
                    /> */}
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Password</h3>


                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) =>
                            <Input
                                error={(errors.password) ? true : false}
                                autoComplete="off"
                                onChange={onChange}
                                value={value}
                                disableUnderline
                                fullWidth
                            />}
                    />


                    <h3 css={Accent}>Forgot Password?</h3>
                </Grid>

                <Grid s={12}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size='small'
                    >login</Button>
                    <h3 css={Muted}>
                        Need an account?{' '}
                        <Link to="/auth/signup" css={Accent}>
                            Sign up
                        </Link>
                    </h3>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Login

export interface Props { }
