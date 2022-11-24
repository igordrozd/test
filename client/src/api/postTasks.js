import sendRequest from '../utils/request';

export function postTasks(data) {
    return sendRequest(`http:localhost:8000/api/tasks`, 'POST', data);
}