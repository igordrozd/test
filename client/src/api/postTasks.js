import sendRequest from '../utils/request';

export function postTasks(data) {
    return sendRequest(`http:localhost:${port}/api/tasks`, 'POST', data);
}