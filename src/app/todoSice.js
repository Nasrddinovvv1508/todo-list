import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    todos: [],
}

let todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, { payload }) => {
            state.todos = [...state.todos, payload];
        },
        removeTodo: (state, { payload }) => { },
        changeStatusTodo: (state, { payload }) => { },
    },
})

// actions
export let { addTodo, removeTodo, changeStatusTodo } = todosSlice.actions;
export default todosSlice.reducer