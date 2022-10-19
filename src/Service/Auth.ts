// require("dotenv").config({ path: "../../.env" });

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;


const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  Storage: new AmazonCognitoIdentity.CookieStorage({
    domain: process.env.REACT_APP_DOMAIN,
  }),
};
const pool_region = process.env.REACT_APP_POOL_REGION;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


interface CognitoUserSession {
  idToken: CognitoIdToken;
  refreshToken: CognitoRefreshToken;
  accessToken: CognitoAccessToken;
  clockDrift: number;
}
type CognitoIdToken = {
  jwtToken: string;
  payload: {
    sub: string;
    email_verified: boolean;
    iss: string;
    "cognito:username": string;
    picture: string;
    aud: string;
    event_id: string;
    token_use: "id";
    auth_time: number;
    nickname: string;
    exp: number;
    iat: number;
    email: string;
  };
};
type CognitoRefreshToken = {
  token: string;
};
type CognitoAccessToken = {
  jwtToken: string;
  payload: {
    sub: string;
    event_id: string;
    token_use: "access";
    scope: string;
    auth_time: number;
    iss: string;
    exp: number;
    iat: number;
    jti: string;
    client_id: string;
    username: string;
  };
};

export function loginCognito(username: string, password: string) {
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
      Storage: new AmazonCognitoIdentity.CookieStorage({ domain: "localhost" }),
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: CognitoUserSession) {

        //@ts-ignore
        window.location.href = process.env.REACT_APP_URL;
        resolve(result);
      },
      onFailure: function (err: any) {
        resolve(false);
      },
    });
  });
}
export const logoutCognito = async () => {
  var cookies = parseCookies();
  const userData = {
    Username: cookies.LastAuthUser,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  window.localStorage.clear();
  deleteAllCookies();
  await cognitoUser.signOut();
  //@ts-ignore
  window.location.href = process.env.REACT_APP_URL;
  return true;
};
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
      console.log(error);
      reject(error);
    }
  });
};


export const validateCookies = async () => {
  return new Promise((resolve) => {
    try {
      const cookies = parseCookies();
      console.log(cookies)
      if (
        cookies.refreshToken === undefined ||
        cookies.LastAuthUser === undefined
      ) {
        resolve(false);
        return;
      }

      const userData = {
        Username: cookies.LastAuthUser,
        Pool: userPool,
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      var token = new AmazonCognitoIdentity.CognitoRefreshToken({
        RefreshToken: cookies.refreshToken,
      });

      cognitoUser.refreshSession(token, function (err: any, session: any) {
        if (err) resolve(false);
        try {
          console.log(session)
          var token = session.getAccessToken().getJwtToken();
          createCookie(
            `CognitoIdentityServiceProvider.${poolData.ClientId}.${cookies.LastAuthUser}.accessToken`,
            token,
            12
          );
          resolve(true);
        } catch (error) {
          console.log(error);

          resolve(false);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
};

export function signUpCognito(username: string, password: string, email: string) {
  var attributeList = [];

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: email,
    })
  );

  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err: any, result: any) {
      if (err) {
        console.log(err);
        return false;
      }
      console.log(result)
    }
  );
}







//   HELPERS
const deleteAllCookies = () => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
const createCookie = (name: string, value: any, hours: number) => {
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    var expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};
const parseCookies = () => {
  var cookies = document.cookie;
  var output: any = {};
  cookies.split(/\s*;\s*/).forEach(function (pair: any) {
    pair = pair.split(/\s*=\s*/);
    var name = pair[0].split(".");
    output[name[name.length - 1]] = pair.splice(1).join("=");
  });
  return output;
};
