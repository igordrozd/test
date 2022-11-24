import sendRequest from '../utils/request';
import { port } from './port'

export function register(data) {
    return sendRequest(`http://localhost:${port}/api/users/register`, 'POST', data);
}