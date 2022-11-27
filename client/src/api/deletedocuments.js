import sendRequest from '../utils/request';
import {host} from './host';

export function deleteDocumentById(id) {
    return sendRequest(`${host}/api/documents/${id}`, 'DELETE');
}