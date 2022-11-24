import sendRequest from '../utils/request';

export function postTasks() {
    return sendRequest(`http:localhost:8000/api/tasks`, 'POST');
}