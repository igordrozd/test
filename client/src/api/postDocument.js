import sendRequest from '../utils/request';
import port from '../port'
export function postDocuments(data) {
    return sendRequest(`http:localhost:${port}/api/documents`, 'POST', data);
}