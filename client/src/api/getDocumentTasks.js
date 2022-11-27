import sendRequest from '../utils/request';

export function getDocumentTasks(documentId) {
    return sendRequest(`/api/documents/${documentId}/tasks`, 'GET');
}