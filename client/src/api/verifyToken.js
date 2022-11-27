import sendRequest from '../utils/request';
import { host } from './host';

export async function verifyToken() {
    const response = await sendRequest(`${host}/api/users/verify`, 'POST');
    const json = await response.json();
    return json;
}