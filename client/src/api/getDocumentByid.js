import sendRequest from '../utils/request';
import {host} from './host';

export function getDocument(id) {
    return sendRequest(`${host}/api/documents/${id}`, 'GET');
}