/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Misc/Paper'
import { Controller, useForm } from 'react-hook-form'
import { loginCognito } from 'Service/Cognito'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Button, Input } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { brand, mMuted, sMuted } from 'Stories/Text/Text'

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

    const handleClick = () => {}

    return (
        <Paper
            width="100%"
            height="min-content"
            background="sec"
            radius="m"
            padding={6}
            elevation={'x'}
        >
            <Grid
                container
                rowSpacing={4}
                maxWidth="400px"
                width="100%"
                sx={{ caretColor: 'transparent ' }}
            >
                <Grid xs={12}>
                    <h2 css={brand}>Artram</h2>
                </Grid>

                <Grid xs={12}>
                    <Grid>
                        <h3 css={mMuted}>Username</h3>
                    </Grid>

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
                            />
                        )}
                    />
                </Grid>

                <Grid xs={12}>
                    <Grid>
                        <h3 css={mMuted}>Password</h3>
                    </Grid>

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                error={errors.password ? true : false}
                                autoComplete="off"
                                onChange={onChange}
                                value={value}
                                disableUnderline
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid xs={12}>
                    <Button
                        sx={{marginTop:'12px',borderRadius:'8px'}}
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="small"
                    >
                        login
                    </Button>
                    <Grid>
                        <h3 css={sMuted}>
                            Need an account?
                            <Link to="/auth/signup" css={{ color: '#9147ff',marginLeft:'4px' }}>
                                Sign up
                            </Link>
                        </h3>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Login

export interface Props {}
