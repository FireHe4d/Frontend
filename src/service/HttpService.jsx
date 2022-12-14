export const PostWithAuth = (url, body) => {

    var request = fetch("https://tamaktar.herokuapp.com"+url,  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("refreshKey"),
        },
        body : JSON.stringify(body),
      })

    return request
}

export const PostWithoutAuth = (url, body) => {

    var request = fetch("https://tamaktar.herokuapp.com"+url,  {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(body),
      })

    return request
}

export const PutWithAuth = (url, body) => {

    var request = fetch("https://tamaktar.herokuapp.com"+url,  {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("refreshKey"),
        },
        body : JSON.stringify(body),
      })

    return request
}

export const GetWithAuth = (url) => {

    var request = fetch("https://tamaktar.herokuapp.com"+url,  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("refreshKey"),
        }
      })

    return request
}

export const DeleteWithAuth = (url) => {

    var request = fetch("https://tamaktar.herokuapp.com"+url,  {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem("refreshKey"),
        },
      })

    return request
}
export const DeleteWithAuthBody = (url, body) => {

  var request = fetch("https://tamaktar.herokuapp.com"+url,  {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("refreshKey"),
      },
      body : JSON.stringify(body),
    })

  return request
}

export const RefreshToken = () => {

  var request = fetch("https://tamaktar.herokuapp.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: localStorage.getItem("currentUser"),
      refreshToken: localStorage.getItem("refreshKey"),
    }),
  })
  return request
}