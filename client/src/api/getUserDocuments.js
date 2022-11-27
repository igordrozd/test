import sendRequest from '../utils/request';
import {host} from './host';

export function getUserDocuments() {
    return sendRequest(`${host}/api/documents`, 'GET');
}