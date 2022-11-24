import sendRequest from '../utils/request';

export function postDocuments(data) {
    return sendRequest(`http:localhost:8000/api/documents`, 'POST', data);
}