import moment from "moment";
export function login({
  email,
  password,
  history,
  cookies,
  from,
  sessionContext,
  sessionCartInfo,
  messageContext,
}) {
  messageContext.clearMessages();
  return fetch("/api/user/login", {
    method: "post",
    headers: { 
      "Content-Type": "application/json",
      'Accept': 'application/json' },
    body: JSON.stringify({
      user: {
        email: email,
        password: password
      }
    })
  }).then(response => {
    if (response.ok) {
      return response.json().then(json => {
        messageContext.setSuccessMessages(json.msg);
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
        messageContext.setErrorMessages(json.msg);
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
  sessionContext,
  messageContext
}) {
  messageContext.clearMessages();
  return fetch("/api/user/signup", {
    method: "post",
    headers: { 
      "Content-Type": "application/json",
      'Accept': 'application/json' },
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
        messageContext.setSuccessMessages(json.msg);
        sessionContext.saveSession(json.token, json.user);
        cookies.set("token", json.token, {
          expires: moment()
            .add(1, "hour")
            .toDate()
        });
        history.push("/");
      } else {
        messageContext.setErrorMessages(json.msg);
      }
    });
  });
}
