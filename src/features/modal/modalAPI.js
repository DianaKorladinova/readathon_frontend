export function login(user) {
    return fetch("https://diana.jware-virtual.com:8443/users/login", {
        method: 'POST', credentials: 'include', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(user)
    }).then(response => {
        return response.json().then(json => {
            if (response.status === 200)
                return {success: true, response: json}
            else
                return {success: false, err: json}
        })
    })
        .catch(() => ({success: false, err: {message: "Error getting to server, retry later."}}))
}

export function register(user) {
    let {username, password} = user
    return fetch("https://diana.jware-virtual.com:8443/users/register", {
        method: 'POST', credentials: 'include', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({username, password})
    }).then(response => {
        return response.json().then(json => {
            if (response.status === 201)
                return {success: true, response: json}
            else
                return {success: false, err: json}
        })
    })
        .catch(() => ({success: false, err: {message: "Error getting to server, retry later."}}))
}
