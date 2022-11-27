import sendRequest from '../utils/request';

export function getDocuments() {
    return sendRequest(`/api/documents`, 'GET');
}