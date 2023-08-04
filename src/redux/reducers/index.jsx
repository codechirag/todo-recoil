import todoItems from "./todoOperation";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    todoItems
});

export default rootReducer;