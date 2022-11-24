import sendRequest from '../utils/request';

export function login(data) {
    return sendRequest(`http:localhost:${port}/api/users/login`, 'POST', data);
}