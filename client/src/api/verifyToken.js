import sendRequest from '../utils/request';
import { port } from './port';

export async function verifyToken() {
    const response = await sendRequest(`http://localhost:${port}/api/users/verify`, 'POST');
    const json = await response.json();
    return json;
}