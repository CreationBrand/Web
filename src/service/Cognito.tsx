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
    try {
        cognitoUser.signOut();
        deleteAllCookies();
        window.location.reload();
    } catch (err) {
        deleteAllCookies();
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

