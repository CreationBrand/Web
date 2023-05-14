
var get = async (path: string) => {

  var request = await fetch(`${process.env.REACT_APP_ENDPOINT}/${path}`, {
    method: "GET",
    credentials: "include",
    //@ts-ignore
    headers: {
      "Access-Control-Allow-Origin": process.env.REACT_APP_ENDPOINT,
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
  });

  if (request.status === 200) {
    return request.json();
  } else {
    return false;
  }
};

var del = async (path: string, body: any) => {
  var request = await fetch(`${process.env.REACT_APP_ENDPOINT}/${path}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      //   "Access-Control-Allow-Origin": process.env.REACT_APP_ENDPOINT,
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    body: JSON.stringify(body),
  });

  if (request.status === 200) {
    return true;
  } else {
    return false;
  }
};

var post = async (path: string, body: any) => {
  var request = await fetch(`${process.env.REACT_APP_ENDPOINT}/${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      //   "Access-Control-Allow-Origin": process.env.REACT_APP_ENDPOINT,
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    body: JSON.stringify(body),
  });

  if (request.status === 200) {
    return true;
  } else {
    return false;
  }
};

var fileUpload = async (path: string, public_id: string, type: string, file: any) => {
  var request = await fetch(`${process.env.REACT_APP_ENDPOINT}/${path}`, {
    method: "PUT",
    credentials: "include",
    //@ts-ignore
    headers: {
      "Access-Control-Allow-Methods": 'PUT',
      "Access-Control-Allow-Origin": process.env.REACT_APP_ENDPOINT,
      "Access-Control-Allow-Credentials": "true",
      Cookies: document.cookie,
    },

    body: JSON.stringify({
      public_id: public_id,
      type: type,
      file:file,
    })
  });

  if (request.status === 200) {
    return true;
  } else {
    return false;
  }
};

export { get, del, post, fileUpload };
