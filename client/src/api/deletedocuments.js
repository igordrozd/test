import sendRequest from '../utils/request';

export function deleteDocuments() {
    return sendRequest(`http:localhost:${port}/api/documents/:id`, 'DELETE');
}