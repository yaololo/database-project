import moment from "moment";
export function login({
  email,
  password,
  history,
  cookies,
  from,
  sessionContext,
  sessionCartInfo
}) {
  return fetch("/api/user/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        email: email,
        password: password
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        sessionContext.saveSession(json.token, json.user);
        cookies.set("token", json.token, {
          expires: moment()
            .add(1, "hour")
            .toDate()
        });
        history.replace(from);
      });
    } else {
      return response.json().then(json => {
        const messages = Array.isArray(json) ? json : [json];
      });
    }
  });
}

export function signup({
  firstName,
  lastName,
  gender,
  email,
  password,
  history,
  cookies,
  sessionContext
}) {
  return fetch("/api/user/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password
      }
    })
  }).then(response => {
    return response.json().then(json => {
      if (response.ok) {
        sessionContext.saveSession(json.token, json.user);
        cookies.set("token", json.token, {
          expires: moment()
            .add(1, "hour")
            .toDate()
        });
        history.push("/");
      } else {
        const messages = Array.isArray(json) ? json : [json];
      }
    });
  });
}
