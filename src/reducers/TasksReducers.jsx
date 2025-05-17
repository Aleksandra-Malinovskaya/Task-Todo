import { ADD_NEW_TASK, DELETE_TASK, UPDATE_TASK, TOGGLE_TASK } from "../actions/TasksActions";

const initialTasks = [];

const TasksReducer = (state = initialTasks, action) =>{
    switch(action.type){
        case ADD_NEW_TASK: {
            return [...state, action.payload]
            }
        case DELETE_TASK:{
            return state.filter(item => item.id !== action.payload);
        }
        case UPDATE_TASK:{
            return state.map(item => 
                item.id === action.payload.id
                    ? { ...item, title: action.payload.title }
                    : item
            );
        }
        case TOGGLE_TASK:{
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, isActive: !item.isActive }
                    : item
            );
        }
        default:{
            return state;
        }
    }
}   
    
export {TasksReducer}
