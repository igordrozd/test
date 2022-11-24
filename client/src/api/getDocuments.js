import sendRequest from '../utils/request';
import port from '../port'
export function getDocuments() {
    return sendRequest(`http://localhost:${port}/api/documents`, 'GET');
}