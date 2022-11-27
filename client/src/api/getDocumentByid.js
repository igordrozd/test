import sendRequest from '../utils/request';

export function getDocument(id) {
    return sendRequest(`/api/documents/${id}`, 'GET');
}