import sendRequest from '../utils/request';
import port from '../port'
export function deleteIcon() {
    return sendRequest(`http://localhost:${port}/api/icon/:id`, 'DELETE');
}