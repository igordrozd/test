import sendRequest from '../utils/request';

export function postUsers() {
    return sendRequest(`http:localhost:8000/api/users`, 'POST');
}