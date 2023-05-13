/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Misc/Paper'

import { useForm, Resolver, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUpCognito } from 'Service/Auth'
import { post } from 'Service/Request'
import { Input } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
import { brand, sMuted } from 'Stories/Bits/Text/Text'
import { textLabel, textLight, textNormal } from 'Global/Mixins'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

const Signup = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm()


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async (data) => {

        setLoading(true)
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
            setLoading(false)
        }
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
                    <h2 css={brand}>Sign Up</h2>
                </Grid>

                <h3 css={[textNormal('m'), { margin: 'auto' }]}>Sorry currently not accepting new users
                    <Link
                        to="/auth"
                        css={{ color: '#9147ff', marginLeft: '4px' }}
                    >
                        Return
                    </Link>
                </h3>



                {/* <Grid xs={12}>

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
                            />
                        )}
                    />
                </Grid>

                <Grid xs={12}>

                    <h3 css={textLabel('s')}>Password</h3>

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
                    <h3 css={textLabel('s')}>Confirm Password</h3>


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
                    Sign Up
                </LoadingButton>


                <Grid>
                    <h3 css={textLight('s')}>
                        Have an account?
                        <Link
                            to="/auth"
                            css={{ color: '#9147ff', marginLeft: '4px' }}
                        >
                            Login
                        </Link>
                    </h3>
                </Grid> */}
            </Grid>


        </div>
    )
}

export default Signup

export interface Props { }
