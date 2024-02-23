import React, {useState, useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos])
  // Add the handlesubmit code here
  let handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    let todo = document.getElementById('todoAdd').value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false 
    }
    if (newTodo.text.length > 0) {
      setTodos(todos.concat(newTodo))
    }
    else {
      alert("Enter a valid task!");
    }
    document.getElementById('todoAdd').value = "";
  }
  
  // Add the deleteToDo code here
  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => {
      return todo.id !== id;
    }))
  }
  
  // Add the toggleComplete code here
  let toggleComplete = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  }
  
  // Add the submitEdits code here
  let submitEdits = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.text = document.getElementById('newTodo').value;
      }
      return todo;
    }))
  }
return(
  <div>
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id = 'todoAdd'
      />
      <button type="submit">Add Todo</button>
    </form>
    {todos.map((todo) => (
      <div className="todo" key={todo.id}>
        <div className="todo-text">
          {editing ? (
          <input id="newTodo"></input>
          ) :
           todo.text} 
          <input id="completed" type="checkbox" checked={todo.completed} onChange={() => {toggleComplete(todo.id)}}></input>
        </div>
        <button onClick={()=>{if (editing) {submitEdits(todo.id)}setEditing(!editing)}}>{editing ? 'Submit edits' : 'Edit'}</button>
        <button id='deleteTodo' onClick={() => {deleteTodo(todo.id)}}>Delete</button>
      </div>))}
  </div>
)};
export default App;
