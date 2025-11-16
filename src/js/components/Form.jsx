
import React, { useState } from "react";

const Form=()=>{

    let [task,setTask]=useState("");
    let[list,setList]=useState([]);
    let [hoverIndex, setHoverIndex] = useState(null);
 
    const handleTask= (event )=>{
     setTask(event.target.value)
    }

  const teclado = (event )=>{
      if (event.key === "Enter")
        (addTask());
    };

  const addTask = (event) => {
    event.preventDefault();
    setList([...list, task]); 
    setTask("");//limpia
  };


   const deleteTask = (indexRemove) => {
      const removeTask = list.filter((_, index) => index !== indexRemove);
        setList(removeTask);};


    const listTask = () => {
      return(
        list.map((tarea,index)=>(
          <li key={index}
          onMouseEnter={()=>setHoverIndex(index)}
          onMouseLeave={()=>setHoverIndex(null)}>{tarea} 
          {hoverIndex===index&&(<button type="button" className="close" aria-label="close"
          onClick={()=>deleteTask(index)}>X</button> 
          )}
          </li>
        )));
    };

          


const numbersTaks=(list)=>{
  let cont=list.length;
 return `${cont} items left `
};



return(

<div className="container bgimagen " style={{ width: "50rem", height: "60rem" }}>

  <h1 className="d-flex justify-content-center p-4">todos</h1>
    <div className="paper mx-5" >
      <div className="row m-0 p-0">
 
        <form onSubmit ={addTask}>

          <input type="text" placeholder="What you need to do " value={task} onChange={(e) => setTask(e.target.value)} />

        </form>
    <ul >{listTask(list)} </ul>
      </div>



<div className="footer ">{numbersTaks(list)}</div>
 </div>
 </div>
)};

export default Form;