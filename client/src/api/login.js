import sendRequest from '../utils/request';

export function login(data) {
    return sendRequest(`/api/users/login`, 'POST', data);
}