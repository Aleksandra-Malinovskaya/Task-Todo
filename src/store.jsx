import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { TasksReducer } from "./reducers/TasksReducers";
import { FormReduser } from "./reducers/FormReducers";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    form: FormReduser,
});

const store = createStore(
    rootReducer,
    composeWithDevTools()
)

export {store};