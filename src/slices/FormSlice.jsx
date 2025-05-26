import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    newTask: '',
    updatedId: -1,
    updatedTask: '',
    
}

const FormSlice = createSlice({
    name: 'forms',
    initialState,
    reducers:{
        setNewTask: (state, action) =>{
            state.newTask = action.payload;
        },
        setUpdatedId: (state, action) =>{
            state.updatedId = action.payload;
        },
        setUpdatedTask: (state, action) =>{
            state.updatedTask = action.payload;
        }
    }
})

export const {setNewTask, setUpdatedId, setUpdatedTask} = FormSlice.actions;
export default FormSlice.reducer;