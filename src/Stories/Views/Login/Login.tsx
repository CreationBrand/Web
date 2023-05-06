/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Controller, useForm } from 'react-hook-form'
import { loginCognito } from 'Service/Cognito'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { brand, } from 'Stories/Bits/Text/Text'
import { textLabel, textLight } from 'Global/Mixins'
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react'

const Login = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm()


    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onSubmit = handleSubmit(async (data) => {

        setLoading(true)

        let req = await loginCognito(data.username, data.password, navigate)

        if (!req) {
            setError('username', {
                message: 'Invalid username or password'
            })
            setError('password', {
                message: 'Invalid username or password'
            })
        }

        setLoading(false)

    })


    return (
        <div css={{
            boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%);',
            background: '#272732',
            padding: '22px',
            borderRadius: '8px',
        }} >
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
                            />
                        )}
                    />
                </Grid>

                <Grid xs={12}>

                    <h3 css={textLabel('s')}>Password</h3>

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


                <LoadingButton
                    loadingIndicator="Loading…"
                    loading={loading}
                    sx={{
                        marginTop: '12px', borderRadius: '8px', height: '40px',
                        fontFamily: 'Noto Sans',
                        fontWeight: '700',
                        fontSize: '14px',
                    }}
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                >
                    Login
                </LoadingButton>
                <Grid>
                    <h3 css={textLight('s')}>
                        Need an account?
                        <Link to="/auth/signup" css={{ color: '#9147ff', marginLeft: '4px' }}>
                            Sign up
                        </Link>
                    </h3>
                </Grid>
            </Grid>

        </div>
    )
}

export default Login

export interface Props { }
