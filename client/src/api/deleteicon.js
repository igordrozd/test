import sendRequest from '../utils/request';

export function getDocuments() {
    return sendRequest(`http:localhost:${port}/api/icon/:id`, 'DELETE');
}