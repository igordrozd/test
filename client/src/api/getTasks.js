import sendRequest from '../utils/request';
import port from '../port'
export function getTasks() {
    return sendRequest(`http:localhost:${port}/api/tasks/:id`, 'GET');
}