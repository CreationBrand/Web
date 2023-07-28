
//@ts-nocheck

// const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
// const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool

// const poolData = {
//     UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
//     ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
// }
// const pool_region = process.env.REACT_APP_POOL_REGION
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
// let cognitoUser = userPool.getCurrentUser()



// export async function loginCognito(username: string, password: string) {

//     // Clear all cookies and indexedDB
//     window.indexedDB.databases().then((r: any) => {
//         for (var i = 0; i < r.length; i++) window.indexedDB.deleteDatabase(r[i].name);
//     })
//     sessionStorage.clear();
//     localStorage.clear();
//     deleteAllCookies()

//     return new Promise((resolve) => {


//         var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
//             {
//                 Username: username,
//                 Password: password,
//             }
//         );
//         var userData = {
//             Username: username,
//             Pool: userPool,
//             Storage: new AmazonCognitoIdentity.CookieStorage({ domain: window.location.hostname }),
//         };
//         cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//         cognitoUser.authenticateUser(authenticationDetails, {

//             mfaSetup: function (challengeName: any, challengeParameters: any) {


//                 // if (userCode === '') {
//                 //     setSession(user) // Persist old session
//                 //     user.associateSoftwareToken(this);
//                 // }
//                 // else {
//                 //     user = session // Change user to match persisted session
//                 //     user.verifySoftwareToken(userCode, 'MY_TOTP_DEVICE', this)


//             },

//             onSuccess: function (result: any) {

//                 console.log('%c [LOGIN] ', 'background: #000; color: #5555da', 'SUCCESS', result);

//                 resolve('sucess');
//             },
//             onFailure: function (err: any) {
//                 if (err.code === 'UserNotConfirmedException') {
//                     resolve('verify')
//                 } else {
//                     resolve('error')
//                 }


//             },
//         });
//     });
// }

// export function signUpCognito(username: string, password: string, email: string) {

//     return new Promise((resolve) => {


//         var attributeList = [];
//         attributeList.push(
//             new AmazonCognitoIdentity.CognitoUserAttribute({
//                 Name: 'email',
//                 Value: email,
//             })
//         );

//         try {
//             userPool.signUp(
//                 username,
//                 password,
//                 attributeList,
//                 null,
//                 function (err: any, result: any) {
//                     if (err) {
//                         resolve(err.message);
//                     }
//                     cognitoUser = result?.user;
//                     resolve(true);
//                 }
//             );
//         } catch (e) {
//             resolve(false)
//         }
//     })
// }

// export const verifyEmail = (code: string) => {



//     return new Promise((resolve, reject) => {


//         cognitoUser.confirmRegistration(
//             code,
//             true,
//             function (err: any, result: any) {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(result)
//                 }
//             }
//         )
//     })
// }

// export const verifyCognito = async () => {

//     return new Promise((resolve) => {
//         try {

//             const cookies = parseCookies()

//             if (
//                 cookies.refreshToken === undefined ||
//                 cookies.LastAuthUser === undefined
//             ) {

//                 resolve(false)
//                 return
//             }



//             const userData = {
//                 Username: cookies.LastAuthUser,
//                 Pool: userPool,
//             }



//             const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
//             var token = new AmazonCognitoIdentity.CognitoRefreshToken({
//                 RefreshToken: cookies.refreshToken
//             })

//             cognitoUser.refreshSession(
//                 token,
//                 function (err: any, session: any) {
//                     if (err) {
//                         resolve(false)
//                     }
//                     try {
//                         var token = session.getAccessToken().getJwtToken()
//                         createCookie(
//                             `CognitoIdentityServiceProvider.${poolData.ClientId}.${cookies.LastAuthUser}.accessToken`,
//                             token,
//                             12
//                         )
//                         createCookie(
//                             `socketcluster.authToken`,
//                             token,
//                             12
//                         )

//                         // console.groupEnd()
//                         resolve(session.accessToken.payload)
//                     } catch (error) {
//                         resolve(false)
//                     }
//                 }
//             )
//         } catch (error) {
//             resolve(false)
//         }
//     })
// }


// export const refreshSession = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             var cookies = parseCookies();

//             const userData = {
//                 Username: cookies.LastAuthUser,
//                 Pool: userPool,
//             };

//             const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//             var token = new AmazonCognitoIdentity.CognitoRefreshToken({
//                 RefreshToken: cookies.refreshToken,
//             });

//             cognitoUser.refreshSession(token, function (err: any, session: any) {
//                 try {
//                     var token = session.getAccessToken().getJwtToken();
//                     createCookie(
//                         `CognitoIdentityServiceProvider.${poolData.ClientId}.${cookies.LastAuthUser}.accessToken`,
//                         token,
//                         1
//                     );
//                 } catch {
//                     resolve(false);
//                 }
//                 if (err) {
//                     resolve(false);
//                 }

//                 if (session) {
//                     resolve(session);
//                 }
//                 resolve(false);
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

// export const logoutCognito = async () => {
//     deleteAllCookies()

//     console.log('%c [LOGIN] ', 'background: #000; color: #5555da', 'LOGOUT')
//     try {
//         await cognitoUser.signOut();

//         window.indexedDB.databases().then((r: any) => {
//             for (var i = 0; i < r.length; i++) window.indexedDB.deleteDatabase(r[i].name);
//         })
//         sessionStorage.clear();
//         localStorage.clear();

//     } catch (e: any) {
//         console.log('%c [LOGIN] ', 'background: #000; color: #5555da', 'LOGOUT ERROR', e)
//     }
//     window.location.reload()
//     return true
// }

// //   HELPERS

// function deleteAllCookies() {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i];
//         clearCookie(cookie, window.location.hostname, "/")
//         // console.log('%c [LOGIN] ', 'background: #000; color: #5555da', 'DELETE COOKIE', cookie)
//         // const eqPos = cookie.indexOf("=");
//         // const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         // document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GT";
//     }
// }
// function clearCookie(name: string, domain: string, path: string) {
//     const derivedDomain = domain || document.domain;
//     const derivedPath = path || "/";
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${derivedDomain}; path=${derivedPath}`;
// };

// const createCookie = (name: string, value: any, hours: number) => {
//     if (hours) {
//         var date = new Date()
//         date.setTime(date.getTime() + hours * 60 * 60 * 1000)
//         var expires = '; expires=' + date.toUTCString()
//     } else {
//         expires = ''
//     }
//     document.cookie = name + '=' + value + expires + '; path=/'
// }
// const parseCookies = () => {
//     var cookies = document.cookie
//     var output: any = {}
//     cookies.split(/\s*;\s*/).forEach(function (pair: any) {
//         pair = pair.split(/\s*=\s*/)
//         var name = pair[0].split('.')
//         output[name[name.length - 1]] = pair.splice(1).join('=')
//     })
//     return output
// }

// // HANDLER
// const cognitoCallbacks = {
//     onSuccess: function (data: any) {
//         // Rest of login process...
//     },

//     onFailure: function (err: { message: any }) {
//         // alert(err.message || JSON.stringify(err));
//     },

//     mfaSetup: function (challengeName: any, challengeParameters: any) {
//         // setSetup2FA(true)
//         // if (userCode === '') {
//         //     setSession(user) // Persist old session
//         //     user.associateSoftwareToken(this);
//         // }
//         // else {
//         //     user = session // Change user to match persisted session
//         //     user.verifySoftwareToken(userCode, 'MY_TOTP_DEVICE', this)
//         // }
//     },

//     associateSecretCode: async function (secretCode: any) {
//         // const name = 'InfiniteSkyAI'
//         // const uri = `otpauth://totp/${decodeURI(name)}?secret=${secretCode}`

//         // try {
//         //     const image = await QR.toDataURL(uri)
//         //     setQrCodeImage(image)
//         // } catch (err) {
//         //     console.log(err)
//         // }
//     },

//     selectMFAType: function (challengeName: any, challengeParameters: any) {
//         // var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
//         // user.sendMFASelectionAnswer(mfaType, this);
//     },

//     totpRequired: function (secretCode: any) {
//         // if (userCode === '') setSetup2FA(false)
//         // else user.sendMFACode(userCode, this, 'SOFTWARE_TOKEN_MFA')
//     },

//     mfaRequired: function (codeDeliveryDetails: any) {
//         // var verificationCode = prompt('Please input verification code', '');
//         // user.sendMFACode(verificationCode, this);
//     },
// }


import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CookieStorage,
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-1_uPrAPuIBp',
    ClientId: '2qupv1dhp4ov5sdum1vgd74dr7',
    Storage: new CookieStorage({ domain: 'localhost', secure: false })
}

const userPool = new CognitoUserPool(poolData)

export function signUpCognito(username, email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(
            username,
            password,
            [{ Name: "email", Value: email }],
            null,
            (err, result) => {
                console.log(err, result)
                if (err) {
                    resolve(err.message);
                    return;
                }
                resolve(true);
            }
        );
    });
}

export function verifyEmail(username, code) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        });

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}

export function loginCognito(username, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
            Storage: new CookieStorage({ domain: window.location.hostname, secure: false })
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve('sucess');
            },
            onFailure: (err) => {
                if (err.code === 'UserNotConfirmedException') {
                    resolve('verify')
                } else {
                    resolve('error')
                }
            },
        });
    });
}

export function forgotPassword(username) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        })

        cognitoUser.forgotPassword({
            onSuccess: () => {
                resolve()
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

export function confirmPassword(username, confirmationCode, newPassword) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        })

        cognitoUser.confirmPassword(confirmationCode, newPassword, {
            onSuccess: () => {
                resolve()
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.signOut();
        window.location.reload();
    }
}

export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();

        if (!cognitoUser) {
            reject(new Error("No user found"));
            return;
        }

        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err);
                return;
            }
            cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err);
                    return;
                }
                const userData = attributes.reduce((acc, attribute) => {
                    acc[attribute.Name] = attribute.Value;
                    return acc;
                }, {});

                resolve({ ...userData, username: cognitoUser.username });
            });
        });
    });
}

export function getSession() {
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            resolve(false);
            return;
        }
        cognitoUser.getSession((err, session) => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(session);
        });
    });
}


// OLD

export const reSendCode = () => {
    cognitoUser.resendConfirmationCode(function (err: any, result: any) {
        if (err) return false
        return true
    });
}
