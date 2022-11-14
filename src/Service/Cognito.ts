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

export const loginCognito = (
    username: string,
    password: string,
    navigate: any
) => {
    return new Promise((resolve) => {
        var authenticationDetails =
            new AmazonCognitoIdentity.AuthenticationDetails({
                Username: username,
                Password: password
            })
        var userData = {
            Username: username,
            Pool: userPool,
            Storage: new AmazonCognitoIdentity.CookieStorage({
                domain: 'localhost'
            })
        }
        cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result: any) {
                resolve(result)
                navigate('/home')
            },
            onFailure: function (err: any) {
                if (err.code === 'UserNotConfirmedException') {
                    navigate('/auth/verify')
                }
                resolve(false)
            }
        })
    })
}
export function signUpCognito(
    username: string,
    password: string,
    email: string
) {
    var attributeList = []

    attributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email
        })
    )

    userPool.signUp(
        username,
        password,
        attributeList,
        null,
        function (err: any, result: any) {
            if (err) {
                return false
            }
        }
    )
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
