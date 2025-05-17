import { v4 as uuidv4 } from 'uuid';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';

export const addNewTask = (newTask) =>{
    return{
        type: ADD_NEW_TASK,
        payload:{
            id: uuidv4(),
            title: newTask,
            isActive: true,
        }
    }
}

export const deleteTask = (id) =>{
    return{
        type: DELETE_TASK,
        payload: id
    }
}

export const updateTask = (id, newTitle) =>{
    return{
        type: UPDATE_TASK,
        payload: {
            id,
            title: newTitle
        }
    }
}

export const editTask = (id) =>{
    return{
        type: TOGGLE_TASK,
        payload: id,
    }
}