export default function(address, method, body) {
    return fetch(address, {
        method,
        headers: {
            'Content-type': 'application/json',
            'token': localStorage.getItem('auth_token')
        },
        body: JSON.stringify(body)
    });
}

