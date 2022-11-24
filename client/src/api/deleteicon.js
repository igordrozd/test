import sendRequest from '../utils/request';

export function deleteIcon() {
    return sendRequest(`http:localhost:${port}/api/icon/:id`, 'DELETE');
}