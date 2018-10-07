export function login({
  email,
  password,
  history,
  from,
}) {
  return fetch("/users/login", {
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

        history.replace(from);
      });
    } else {
      return response.json().then(json => {
        console.log('something wrong during login')
      });
    }
  });
}



export function signup({
  name,
  email,
  password,
  history,
}) {
  return fetch('/users/signup', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        name: name,
        email: email,
        password: password
      }
    })
  }).then(response => {
    return response.json().then(json => {
      if (response.ok) {
      } else {
        console.log('something wrong during signup')
        // const messages = Array.isArray(json) ? json : [json];
      }
    });
  });
}

