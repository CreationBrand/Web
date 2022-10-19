/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Comps/Base/Paper'
import { Label, Link as Accent, Muted, Title1 } from 'Comps/Base/Text/Text'
import Button from 'Comps/Inputs/Button/Button'
import Input from 'Comps/Inputs/Input/Input'
import Grid from 'Comps/Unstyled/Grid/Grid'
import { useForm, Resolver } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { signUpCognito } from 'Service/Auth'
import { post } from 'Service/Request'

// const resolver: Resolver<FormValues> = async (values) => {
//     return {
//         values: values.firstName ? values : {},
//         errors: !values.firstName
//             ? {
//                   firstName: {
//                       type: 'required',
//                       message: 'This is required.'
//                   }
//               }
//             : {}
//     }
// }

const s = css({
    maxWidth: '400px',
    background: 'green'
})

const Signup = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.password2) {
            setError('password2', {
                type: 'custom',
                message: 'Passwords do not match'
            })
        } else {
            let req = signUpCognito(data.username, data.password, data.email)
            //reroute to home here
        }
    })

   

    return (
        <Paper
            so={s}
            width="100%"
            height="min-content"
            background="sec"
            radius="m"
            padding={6}
        >
            <Grid s={12} gap={5}>
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
                        varient="fill"
                        palette="pri"
                        label="Sign Up"
                        autoWidth
                    />

                    <h3 css={Muted}>
                        Have an account?{' '}
                        <Link to="/auth" css={Accent}>
                            Sign up
                        </Link>
                    </h3>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Signup

export interface Props {}
