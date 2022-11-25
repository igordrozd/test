import sendRequest from '../utils/request';
import {port} from './port';

export function deleteIcons(id) {
    return sendRequest(`http://localhost:${port}/api/icons/${id}`, 'DELETE');
}