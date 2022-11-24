import sendRequest from '../utils/request';

export function postIcon(data) {
    return sendRequest(`http:localhost:${port}/api/icon`, 'POST', data);
}