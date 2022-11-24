import sendRequest from '../utils/request';

export function getDocuments() {
    return sendRequest(`http:localhost:8000/api/documents/:id/tasks`, 'GET');
}