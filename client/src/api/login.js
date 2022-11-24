import sendRequest from '../utils/request';
import port from '../port'
export function login(data) {
    return sendRequest(`http:localhost:${port}/api/users/login`, 'POST', data);
}