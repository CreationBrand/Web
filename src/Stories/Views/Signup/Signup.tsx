/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Misc/Paper'

import { useForm, Resolver, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUpCognito } from 'Service/Auth'
import { post } from 'Service/Request'
import { Button, Input } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
import { brand, heading2, mMuted, sMuted } from 'Stories/Text/Text'

const Signup = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        if (data.password1 !== data.password2) {
            setError('password', {
                type: 'custom',
                message: 'Passwords do not match'
            })
        } else {
            console.log(data)
            let req: any = signUpCognito(
                data.username,
                data.password1,
                data.email
            )
            //reroute to home here
            if (req.userConfirmed === false) navigate(`/verify`)
        }
    })

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
                    <h2 css={brand}>Sign Up</h2>
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
                        <h3 css={mMuted}>Email</h3>
                    </Grid>

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
                            />
                        )}
                    />
                </Grid>

                <Grid xs={12}>
                    <Grid>
                        <h3 css={mMuted}>Password</h3>
                    </Grid>

                    <Controller
                        name="password1"
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
                    <Grid>
                        <h3 css={mMuted}>Confirm Password</h3>
                    </Grid>

                    <Controller
                        name="password2"
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
                        sx={{ marginTop: '12px', borderRadius: '8px' }}
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="small"
                    >
                        Sign Up
                    </Button>
                    <Grid>
                        <h3 css={sMuted}>
                            Have an account?
                            <Link
                                to="/auth"
                                css={{ color: '#9147ff', marginLeft: '4px' }}
                            >
                                Login
                            </Link>
                        </h3>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid s={12} gap={5}>
                <Grid s={12} column>
                    <h2 css={Title1}>Create an Account</h2>
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Username</h3>
                    <Input
                        error={errors.username ? true : false}
                        control={register('username', { required: true })}
                        hint="This is the name people will know you by on Artram."
                    />
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Email</h3>
                    <Input
                        control={register('email', {
                            required: true,
                            pattern:
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        })}
                        error={errors.email ? true : false}
                        errorMessage="Please enter a valid email address."
                    />
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Password</h3>
                    <Input
                        error={errors.password ? true : false}
                        control={register('password', { required: true })}
                    />
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Confirm Password</h3>
                    <Input
                        error={errors.password2 ? true : false}
                        errorMessage={'Passwords do not match.'}
                        control={register('password2', { required: true })}
                    />
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
                        Have an account?{' '}
                        <Link to="/auth" css={Accent}>
                            Sign up
                        </Link>
                    </h3>
                </Grid>
            </Grid> */}
        </Paper>
    )
}

export default Signup

export interface Props {}
