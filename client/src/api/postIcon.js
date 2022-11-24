import sendRequest from '../utils/request';

export function postIcon(data) {
    return sendRequest(`http:localhost:8000/api/icon`, 'POST', data);
}