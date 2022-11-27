import sendRequest from '../utils/request';

export function postDocuments(data) {
    return sendRequest(`/api/documents`, 'POST', data);
}