
import React, { useState, useEffect } from "react";


const Form = () => {
  let [task, setTask] = useState("");
  let [list, setList] = useState([]);
  let [hoverid, setHoverid] = useState(null);
  const API_URL = "https://playground.4geeks.com/todo/";

  const createUser = () => {
    fetch(API_URL + "users/David", {
      method: "POST",
      body:JSON.stringify({
        name: "David",
        id: 24
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("No se pudo crear el usuario");
        }
        return response.json();
      })
     .then((data)=>console.log(data))
      .catch(error => console.error("Error:", error));//manejo de errores
  };

  
////////

  const obtenerTask = () => {
    fetch(API_URL + "users/David")
      .then((response) => {
        if (response.status === 404) {
          return createUser();
          }      
        return response.json();
      })
      .then(data => {
          if (data && data.todos) {
            setList(data.todos);
          }})
      .catch(error => console.error("Error:", error));//manejo de errores
  };

//////
  const addTask = (event) => {
    event.preventDefault();
    // setList([...list, task]);
    //setTask("");//limpia
    if (task.trim() === "") return;
    fetch(API_URL + "todos/David", {
      method: "POST",
      body: JSON.stringify(
        {
          label: task,
          is_done: false
        }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok)
          throw new Error("No se pudo agregar la tarea");
        return response.json();
      })
      .then(() => {
        obtenerTask();//para que sincrenice la list
        setTask("");
      })
      .catch(error => console.error("Error", error));
  };

  const deleteTask = (id) => {
    fetch(API_URL + "todos/" + id, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) throw new Error("Error al eliminar tarea");
        obtenerTask();//actualiza la list
      })
      .catch(error => console.error("Error:", error));
  };

  const deleteAllTasks = () => {

    fetch(API_URL + "users/David", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Error al eliminar todas las tareas");
        setList([]);
        createUser();
      })
      .catch(error => console.error());//manejo de errores
  };


  const listTask = () => {
    return (
      list.map((tarea) => (
        <li key={tarea.id}
          onMouseEnter={() => setHoverid(tarea.id)}
          onMouseLeave={() => setHoverid(null)}>{tarea.label}
          {hoverid === tarea.id && (<button type="button" className="close" aria-label="close"
            onClick={() => deleteTask(tarea.id)}>X</button>
          )}
        </li>
      )));
  };

  useEffect(() => {
    obtenerTask();
  }, []);

  const numbersTaks = (list) => {
    let cont = list.length;
    return `${cont} items left `
  }
  const teclado = (event) => {
    if (event.key === "Enter") {
      addTask(event);
    }
  };
  const handleTask = (event) => {
    setTask(event.target.value);
  };

  return (
    <div className="container bgimagen " style={{ width: "50rem", height: "60rem" }}>
      <h1 className="d-flex justify-content-center p-4">todos</h1>
      <div className="paper mx-5" >
        <div className="row m-0 p-0">
          <form onSubmit={addTask}>
            <label htmlFor="task" className="visually-hidden">Nueva Tarea</label>
            <input  type="text" id="task" name="new" placeholder="What you need to do" value={task} onChange={handleTask} className="form-control" />
          </form>
          <ul >{listTask()} </ul>
        </div>
        <div className="footer ">{numbersTaks(list)} {"    "} <button type="button" className="btn btn-outline-secondary" onClick={deleteAllTasks}>Delete all tasks</button>
        </div>
      </div>
    </div>
  );
};
export default Form;
