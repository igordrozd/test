import sendRequest from '../utils/request';
import {port} from './port';

export function deleteDocumentById(id) {
    return sendRequest(`http://localhost:${port}/api/documents/${id}`, 'DELETE');
}