import sendRequest from '../utils/request';
import {port} from './port';

export function getDocument(id) {
    return sendRequest(`http://localhost:${port}/api/documents/${id}`, 'GET');
}