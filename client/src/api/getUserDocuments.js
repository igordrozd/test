import sendRequest from '../utils/request';

export function getUserDocuments() {
    return sendRequest(`http:localhost:8000/api/documents`, 'GET');
}