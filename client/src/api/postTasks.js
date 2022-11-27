import sendRequest from '../utils/request';

export function postTasks(data) {
    return sendRequest(`/api/tasks`, 'POST', data);
}