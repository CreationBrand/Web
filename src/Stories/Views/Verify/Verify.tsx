/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Misc/Paper'

import { useForm, Resolver } from 'react-hook-form'
import { signUpCognito } from 'Service/Auth'
import { verifyEmail } from 'Service/Cognito'

const s = css({
    maxWidth: '400px',
    background: 'green'
})

const Verify = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        console.log(data.code)
        verifyEmail(data.code)
    })

    // const handleClick = () => props.setLS(true)

    return (
        <Paper
            so={s}
            width="100%"
            height="min-content"
            background="sec"
            radius="m"
            padding={6}
        >
            {/* <Grid s={12} gap={5}>
                <Grid s={12} column>
                    <h2 css={Title1}>Verify Email</h2>
                </Grid>

                <Grid s={12} column>
                    <h3 css={Label}>Email</h3>
                    <Input
                        control={register('code', {
                            required: true
                        })}
                        error={errors.email ? true : false}
                        errorMessage="Please enter the Code."
                    />
                </Grid>

                <Grid s={12}>
                    <Button
                        onClick={onSubmit}
                        varient="fill"
                        palette="pri"
                        label="Verify Email"
                        autoWidth
                    />
                </Grid>
            </Grid> */}
        </Paper>
    )
}

export default Verify

export interface Props {}
