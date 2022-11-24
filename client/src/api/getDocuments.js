import sendRequest from '../utils/request';

export function getDocuments(data) {
    return sendRequest(`http:localhost:8000/api/documents`, 'GET', data);
}