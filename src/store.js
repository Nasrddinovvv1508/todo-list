import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./app/todoSice";

export let store = configureStore({
    reducer: {
        todos: todosReducer,
    },
})