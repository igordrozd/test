import sendRequest from '../utils/request';
import {host} from './host';

export function getDocuments() {
    return sendRequest(`${host}/api/documents`, 'GET');
}