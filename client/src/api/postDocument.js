import sendRequest from '../utils/request';

export function postDocuments(data) {
    return sendRequest(`http:localhost:${port}/api/documents`, 'POST', data);
}