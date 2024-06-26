import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let initialStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(`todos`)) || {
        todos: [],
        complatedCount: 0,
        unComplotedCount: 0,
    }
}

let todosSlice = createSlice({
    name: "todos",
    initialState: initialStateFromLocalStorage(),
    reducers: {
        addTodo: (state, { payload }) => {
            state.todos = [...state.todos, payload];

            todosSlice.caseReducers.calculateTotal(state)
        },
        removeTodo: (state, { payload }) => {
            state.todos = state.todos.filter((todo) => todo.id != payload);
            todosSlice.caseReducers.calculateTotal(state)
            toast.success(`Deleted!`)
        },
        changeStatusTodo: (state, { payload }) => {
            let item = state.todos.find((todo) => todo.id == payload)
            item.complated = !item.complated
            todosSlice.caseReducers.calculateTotal(state)
        },
        calculateTotal: (state) => {
            localStorage.setItem('todos', JSON.stringify(state))

            let done = 0;
            let notDone = 0;

            state.todos.forEach((todo) => {
                if (todo.complated) {
                    done += 1
                } else {
                    notDone += 1
                }
            })

            state.complatedCount = done;
            state.unComplotedCount = notDone;
        }
    },
})

// actions
export let { addTodo, removeTodo, changeStatusTodo } = todosSlice.actions;
export default todosSlice.reducer