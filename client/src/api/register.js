import sendRequest from '../utils/request';

export function register(data) {
    return sendRequest(`http:localhost:8000/api/users/register`, 'POST', data);
}