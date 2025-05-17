export const NEW_TASK = 'NEW_TASK';
export const UPDATED_ID = 'UPDATED_ID';
export const UPDATED_TASK = 'UPDATED_TASK';

export const setNewTask = (title) =>{
    return{
        type: NEW_TASK,
        payload: title,
    }
}

export const setUpdatedId = (id) =>{
    return{
        type: UPDATED_ID,
        payload: id,
    }
}

export const setUpdatedTask = (title) =>{
    return{
        type: UPDATED_TASK,
        payload: title,
    }
}