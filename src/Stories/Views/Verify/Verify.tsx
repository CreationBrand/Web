/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Paper from 'Stories/Misc/Paper'

import { useForm, Resolver, Controller } from 'react-hook-form'
import { signUpCognito } from 'Service/Auth'
import { verifyEmail } from 'Service/Cognito'
import Grid from '@mui/material/Unstable_Grid2'
import { brand, mMuted } from 'Stories/Bits/Text/Text'
import { Button, Input } from '@mui/material'

const s = css({
    maxWidth: '400px',
    background: 'green'
})

const Verify = (props: Props) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        console.log(data.code)
        let res = verifyEmail(data.code)
        console.log(res)

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
            <Grid
                container
                rowSpacing={4}
                maxWidth="400px"
                width="100%"
                sx={{ caretColor: 'transparent ' }}
            >
                <Grid xs={12}>
                    <h2 css={brand}>Verify</h2>
                </Grid>

                <Grid xs={12}>
                    <Grid>
                        <h3 css={mMuted}>Code</h3>
                    </Grid>

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
                            />
                        )}
                    />
                </Grid>

                <Button
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                >
                    submit
                </Button>
            </Grid>

            {/* <Grid s={12} column>
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
