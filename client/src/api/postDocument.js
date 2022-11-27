import sendRequest from '../utils/request';
import {host} from './host';

export function postDocuments(data) {
    return sendRequest(`${host}/api/documents`, 'POST', data);
}