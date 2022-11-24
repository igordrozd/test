import sendRequest from '../utils/request';
import port from '../port'
export function getDocumentTasks() {
    return sendRequest(`http:localhost:${port}/api/documents/:id/tasks`, 'GET');
}