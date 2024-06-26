// css
import "./App.css"

// hooks
import { useRef } from "react"

// redux
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, changeStatusTodo, removeComplated } from "./app/todoSice";

// icons
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

function App() {
  let dispatch = useDispatch();
  let inputValue = useRef();

  let { todos, complatedCount, unComplotedCount } = useSelector((state) => state.todos)
  console.log(todos);

  let handleSubmit = (e) => {
    e.preventDefault();
    let value = inputValue.current.value;
    if (value.trim()) {
      dispatch(addTodo({
        id: Math.random(),
        text: value,
        complated: false,
      }));
      toast.success(`Added successfully`);
      inputValue.current.value = ``;
    } else {
      toast.error(`Please, Write Something`);
    }
  }

  return (
    <div className="wrapper max-w-[700px] w-full mx-auto border text-center mt-20 rounded-3xl">
      <center>
        <div className="w-full bg-[#f1ece6] mb-4 text-4xl flex items-center justify-center font-semibold rounded-t-3xl">
          <h1>TO<span className="text-[#d98326]">DO</span></h1>
          {todos.length > 0 && <span className="text-2xl ml-2"> - {todos.length}</span>}
        </div>
      </center>
      <form className="max-w-[500px] w-full mx-auto mb-5" onSubmit={handleSubmit}>
        <div className="form-input w-full rounded-full flex">
          <input className="border w-10/12 rounded-l-full h-10 pl-4 bg-[#f1ece6] placeholder:text-lg focus:outline-[#f1d3b3] text-[#969696] " placeholder="What do you need to do?" ref={inputValue} type="text" />
          <button className="rounded-r-full bg-[#76b7cd] w-2/12 h-10 uppercase text-lg text-white font-bold">Add</button>
        </div>
      </form>

      <ul className="max-w-[500px] w-full mx-auto mb-8 bg-[#f1ece6] rounded-3xl px-6">
        {todos.map((todo) => {
          return (
            <li className="border-b-2 py-2 border-[#a3cad6] flex items-center justify-between" key={todo.id}>
              <div className="form-control mr-1">
                <label className="cursor-pointer label">
                  <input type="checkbox" onClick={() => dispatch(changeStatusTodo(todo.id))} readOnly checked={todo.complated} className="checkbox checkbox-warning" />
                </label>
              </div>
              <div className={`flex items-center ${todo.complated ? `complated` : ``}`}>
                <h2 className="w-[300px] text-left text-lg text-gray-500"> {todo.text} </h2>
                <div className="w-[100px] flex gap-2 justify-end">
                  <button onClick={() => dispatch(removeTodo(todo.id))} className="btn btn-error text-white"> <FaTrashCan /> </button>
                  {!todo.complated && <button className="btn btn-primary"> <MdEdit /> </button>}
                </div>
              </div>

            </li>
          )
        })}
        {todos.length > 0 && <div className="w-full flex justify-end mr-5"><button onClick={() => dispatch(removeComplated(todos))} className="text-[#d98326] text-right mt-10 mb-3 flex items-center gap-1"> <TiDelete /> Clear Complated ({complatedCount}) </button></div>}
      </ul>
    </div>
  )
}

export default App