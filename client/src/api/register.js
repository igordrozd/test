import sendRequest from '../utils/request';

export function register(data) {
    return sendRequest(`http:localhost:${port}/api/users/register`, 'POST', data);
}