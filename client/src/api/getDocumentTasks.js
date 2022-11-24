import sendRequest from '../utils/request';
import {port} from './port';

export function getDocumentTasks(documentId) {
    return sendRequest(`http://localhost:${port}/api/documents/${documentId}/tasks`, 'GET');
}