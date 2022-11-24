import sendRequest from '../utils/request';

export function getUserDocuments() {
    return sendRequest(`http:localhost:${port}/api/documents`, 'GET');
}