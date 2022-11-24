import sendRequest from '../utils/request';
import port from '../port'

export function deleteIcon(id) {
    return sendRequest(`http://localhost:${port}/api/icon/${id}`, 'DELETE');
}