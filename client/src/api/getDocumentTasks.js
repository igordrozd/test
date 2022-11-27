import sendRequest from '../utils/request';
import {host} from './host';

export function getDocumentTasks(documentId) {
    return sendRequest(`${host}/api/documents/${documentId}/tasks`, 'GET');
}