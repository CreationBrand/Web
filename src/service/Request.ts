
var get = async (path: string) => {

  // @ts-ignore
  var request = await fetch(`${process.env.REACT_APP_REST}/${path}`, {
    method: "GET",
    credentials: "include",
    //@ts-ignore
    headers: {
      // Cookies: document.cookie,
    },
  });

  if (request.status === 200) {
    return request.json();
  } else {
    return false;
  }
};

export { get};
