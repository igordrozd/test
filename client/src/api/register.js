import sendRequest from '../utils/request';

export function register(data) {
    return sendRequest(`/api/users/register`, 'POST', data);
}