import sendRequest from '../utils/request';

export function getDocumentTasks() {
    return sendRequest(`http:localhost:${port}/api/documents/:id/tasks`, 'GET');
}