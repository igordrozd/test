import { postTasks } from "../api/postTasks";

export async function addTask(values){
    const result = await postTasks(values)
    return await result.json();
}