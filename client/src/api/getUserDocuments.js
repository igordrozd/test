import sendRequest from '../utils/request';

export function getUserDocuments() {
    return sendRequest(`/api/documents`, 'GET');
}