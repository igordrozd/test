import sendRequest from '../utils/request';

export function getUsers(data) {
    return sendRequest(`http:localhost:8000/api/users`, 'GET', data);
}