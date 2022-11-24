import sendRequest from '../utils/request';

export function login(data) {
    return sendRequest(`http:localhost:8000/api/users/login`, 'POST', data);
}