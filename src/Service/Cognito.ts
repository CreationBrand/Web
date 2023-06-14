const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool

const poolData = {
    UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    Storage: new AmazonCognitoIdentity.CookieStorage({
        domain: process.env.REACT_APP_DOMAIN
    })
}
const pool_region = process.env.REACT_APP_POOL_REGION
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
let cognitoUser = userPool.getCurrentUser()



export function loginCognito(username: string, password: string) {

    deleteAllCookies()

    return new Promise((resolve) => {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            {
                Username: username,
                Password: password,
            }
        );
        var userData = {
            Username: username,
            Pool: userPool,
            Storage: new AmazonCognitoIdentity.CookieStorage({ domain: "artram.app" }),
        };
        cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {

            mfaSetup: function (challengeName: any, challengeParameters: any) {


                // if (userCode === '') {
                //     setSession(user) // Persist old session
                //     user.associateSoftwareToken(this);
                // }
                // else {
                //     user = session // Change user to match persisted session
                //     user.verifySoftwareToken(userCode, 'MY_TOTP_DEVICE', this)


            },

            onSuccess: function (result: any) {
                resolve('sucess');
            },
            onFailure: function (err: any) {
                if (err.code === 'UserNotConfirmedException') {
                    resolve('verify')
                } else {
                    resolve('error')
                }


            },
        });
    });
}

export function signUpCognito(username: string, password: string, email: string) {

    return new Promise((resolve) => {


        var attributeList = [];
        attributeList.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'email',
                Value: email,
            })
        );

        try {
            userPool.signUp(
                username,
                password,
                attributeList,
                null,
                function (err: any, result: any) {
                    if (err) {
                        resolve(err.message);
                    }
                    cognitoUser = result?.user;
                    resolve(true);
                }
            );
        } catch (e) {
            resolve(false)
        }
    })
}

export const verifyEmail = (code: string) => {



    return new Promise((resolve, reject) => {


        cognitoUser.confirmRegistration(
            code,
            true,
            function (err: any, result: any) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            }
        )
    })
}

export const verifyCognito = async () => {


    return new Promise((resolve) => {
        try {
            const cookies = parseCookies()
            if (
                cookies.refreshToken === undefined ||
                cookies.LastAuthUser === undefined
            ) {
                resolve(false)
                return
            }

            const userData = {
                Username: cookies.LastAuthUser,
                Pool: userPool
            }

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
            var token = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: cookies.refreshToken
            })


            cognitoUser.refreshSession(
                token,
                function (err: any, session: any) {
                    if (err) resolve(false)
                    try {
                        var token = session.getAccessToken().getJwtToken()
                        createCookie(
                            `CognitoIdentityServiceProvider.${poolData.ClientId}.${cookies.LastAuthUser}.accessToken`,
                            token,
                            12
                        )
                        createCookie(
                            `socketcluster.authToken`,
                            token,
                            12
                        )
                        resolve(session.accessToken.payload)
                    } catch (error) {
                        resolve(false)
                    }
                }
            )
        } catch (error) {
            resolve(false)
        }
    })
}

export const reSendCode = () => {
    cognitoUser.resendConfirmationCode(function (err: any, result: any) {
        if (err) return false
        return true
    });
}

export const refreshSession = () => {
    return new Promise((resolve, reject) => {
        try {
            var cookies = parseCookies();

            const userData = {
                Username: cookies.LastAuthUser,
                Pool: userPool,
            };

            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            var token = new AmazonCognitoIdentity.CognitoRefreshToken({
                RefreshToken: cookies.refreshToken,
            });

            cognitoUser.refreshSession(token, function (err: any, session: any) {
                try {
                    var token = session.getAccessToken().getJwtToken();
                    createCookie(
                        `CognitoIdentityServiceProvider.${poolData.ClientId}.${cookies.LastAuthUser}.accessToken`,
                        token,
                        1
                    );
                } catch {
                    resolve(false);
                }
                if (err) {
                    resolve(false);
                }

                if (session) {
                    resolve(session);
                }
                resolve(false);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const logoutCognito = () => {
    cognitoUser?.signOut();
    deleteAllCookies()
    window.location.reload()
    return true
}

//   HELPERS
const deleteAllCookies = () => {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]
        var eqPos = cookie.indexOf('=')
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}
const createCookie = (name: string, value: any, hours: number) => {
    if (hours) {
        var date = new Date()
        date.setTime(date.getTime() + hours * 60 * 60 * 1000)
        var expires = '; expires=' + date.toUTCString()
    } else {
        expires = ''
    }
    document.cookie = name + '=' + value + expires + '; path=/'
}
const parseCookies = () => {
    var cookies = document.cookie
    var output: any = {}
    cookies.split(/\s*;\s*/).forEach(function (pair: any) {
        pair = pair.split(/\s*=\s*/)
        var name = pair[0].split('.')
        output[name[name.length - 1]] = pair.splice(1).join('=')
    })
    return output
}

// HANDLER
const cognitoCallbacks = {
    onSuccess: function (data: any) {
        // Rest of login process...
    },

    onFailure: function (err: { message: any }) {
        // alert(err.message || JSON.stringify(err));
    },

    mfaSetup: function (challengeName: any, challengeParameters: any) {
        // setSetup2FA(true)
        // if (userCode === '') {
        //     setSession(user) // Persist old session
        //     user.associateSoftwareToken(this);
        // }
        // else {
        //     user = session // Change user to match persisted session
        //     user.verifySoftwareToken(userCode, 'MY_TOTP_DEVICE', this)
        // }
    },

    associateSecretCode: async function (secretCode: any) {
        // const name = 'InfiniteSkyAI'
        // const uri = `otpauth://totp/${decodeURI(name)}?secret=${secretCode}`

        // try {
        //     const image = await QR.toDataURL(uri)
        //     setQrCodeImage(image)
        // } catch (err) {
        //     console.log(err)
        // }
    },

    selectMFAType: function (challengeName: any, challengeParameters: any) {
        // var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
        // user.sendMFASelectionAnswer(mfaType, this);
    },

    totpRequired: function (secretCode: any) {
        // if (userCode === '') setSetup2FA(false)
        // else user.sendMFACode(userCode, this, 'SOFTWARE_TOKEN_MFA')
    },

    mfaRequired: function (codeDeliveryDetails: any) {
        // var verificationCode = prompt('Please input verification code', '');
        // user.sendMFACode(verificationCode, this);
    },
}




