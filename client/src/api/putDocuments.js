import sendRequest from '../utils/request';

export function putDocuments(data,id) {
    return sendRequest(`/api/documents/${id}`, 'PUT', data);
}