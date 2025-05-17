import { NEW_TASK, UPDATED_ID, UPDATED_TASK } from "../actions/FormActions";

const initialTasks = {
    newTask: '',
    updatedId: -1,
    updatedTask: '',
    
}

const FormReduser = (state = initialTasks, action) =>{
    switch(action.type){
        case NEW_TASK: {
            return {...state, newTask: action.payload};
        }
        case UPDATED_ID:{
            return {...state, updatedId: action.payload};
        }
        case UPDATED_TASK: {
            return {...state, updatedTask: action.payload};
        }
        default:{
            return state;
        }
    }

}

export {FormReduser};