// @ts-nocheck

import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CookieStorage,
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-1_uPrAPuIBp',
    ClientId: '2qupv1dhp4ov5sdum1vgd74dr7',
    Storage: new CookieStorage({ domain: window.location.hostname, secure: false })
}
const userPool = new CognitoUserPool(poolData)

let cognitoUser = userPool.getCurrentUser();

export function signUpCognito(username, email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(
            username,
            password,
            [{ Name: "email", Value: email }],
            null,
            (err, result) => {
                try {
                    if (err) {
                        resolve(err.message);
                        return;
                    }
                }catch(e){
                    console.log(e)
                    resolve(false);
                }
                resolve(true);
            }
        );
    });
}

export function verifyEmail(username, code) {
    return new Promise((resolve, reject) => {
        cognitoUser = new CognitoUser({
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

        cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
            Storage: new CookieStorage({ domain: window.location.hostname, secure: false })
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve('sucess');
            },
            onFailure: (err) => {
                console.log(err)

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
        cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool,
        })

        cognitoUser.forgotPassword({
            onSuccess: () => {
                resolve(true)
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

export function confirmPassword(username, confirmationCode, newPassword) {
    return new Promise((resolve, reject) => {
        cognitoUser = new CognitoUser({
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
    cognitoUser = userPool.getCurrentUser();
    try {
        cognitoUser.signOut();
        // deleteAllCookies();
        window.location.reload();
    } catch (err) {
        console.log(err);
        // deleteAllCookies();
        // window.location.reload();
    }
}

export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        cognitoUser = userPool.getCurrentUser();

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
    cognitoUser = userPool.getCurrentUser();
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


function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};