import sendRequest from '../utils/request';
import port from '../port'
export function getUserDocuments() {
    return sendRequest(`http://localhost:${port}/api/documents`, 'GET');
}