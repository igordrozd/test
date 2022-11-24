import sendRequest from '../utils/request';
import port from '../port'
export function postTasks(data) {
    return sendRequest(`http://localhost:${port}/api/tasks`, 'POST', data);
}