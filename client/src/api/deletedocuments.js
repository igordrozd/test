import sendRequest from '../utils/request';

export function deleteDocumentById(id) {
    return sendRequest(`/api/documents/${id}`, 'DELETE');
}