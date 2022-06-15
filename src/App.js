import React, { useState, useEffect } from 'react';

function TaskInput(props) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onTaskSubmit();
  }

  const handleTextChange = (e) => {
    props.onTextChange(e.target.value);
  }

  return (
    <div className='inp'>
      <h3>Add Task to do below:</h3>
      <form
        onSubmit={handleSubmit}
      >
        <input 
          type='text'
          placeholder='type some tasks....'
          value={props.inputText}
          onChange={handleTextChange}
        />
        <button 
          type='submit'
        >+ADD TASK</button>
      </form>
    </div>
  )
}

function TaskTableList(props) {

  const handleDoneorNot = () => {
    props.onDone();
  }

  const handleDelete = (e) => {
    props.onDel(e);
  }

  return (
    <div className='task_container'>
      <ul>
        {
          props.taskList.map((task,index) => 
            <li key={task} id={index}>
              <SingleTask simpleText={task} doneOrNot={handleDoneorNot} onDelBtn={handleDelete} id={index}/>
            </li>
            )
        }
      </ul>
    </div>
  )
}

function SingleTask(props) {

  const onHandelDone = (e) => {
    if (e.target.className === "undone" && e.target.textContent === "DONE") {
      e.target.className = "done"
      e.target.textContent = "UNDONE";
      e.target.parentElement.previousSibling.style.textDecoration = "line-through";
      e.target.parentElement.parentElement.style.background = "lightblue";
    } else {
      e.target.className = "undone";
      e.target.textContent = "DONE";
      e.target.parentElement.previousSibling.style.textDecoration = ""
      e.target.parentElement.parentElement.style.background = "darkkhaki";

    }
    props.doneOrNot();
  }

  const handleDeleteBtn = (e) => {
    props.onDelBtn(e.target.id);
  }

  return (
    <div
      className='taskSingle'
      id={props.id}
    >
      <p id="taskText">{props.simpleText}</p>
      <div className='btns'>
        <button
        className='undone'
        id="doneornot"
        onClick={onHandelDone}>DONE</button>
        <button
        className='del'
        onClick={handleDeleteBtn}
        id={props.id}>DELETE</button>
      </div>
    </div>
  )
}

function ClearAllTask(props) {

  const handleClearAll = () => {
    props.onClearAll();
  }

  return (
    <button
      className='clearAll'
      onClick={handleClearAll}
    >CLEAR ALL</button>
  )
}



function App() {
  const [ inputText, setInputText ] = useState("");
  const [ taskList , setTaskList ] = useState([]);

  const orihandleSubmit = (e) => {

    if (!taskList.includes(inputText)) {
      if (inputText === "") {
        alert("-- YOU INPUT IS EMPTY --");
        return;
      }
      let newTaskList = [...taskList,inputText]
      setTaskList(newTaskList);
      setInputText("");
    } else {
      alert("--YOUR INPUT IS ALREADY IN LIST--")
      setInputText("");
    }
    console.log(taskList);
  }

  const orihandleTextChange = (text) => {
    setInputText(text);
  }

  const orihandleClearAll = () => {
    setTaskList([]);
  }

  const handleDone = () => {
    console.log(taskList);
  }

  const handleDelBtn = (ind) => {
    let id = Number(ind);
    let newArr = taskList.filter((i,index) => {
      if (index !== id) {
        return i
      } 
      return null;
    })

    setTaskList(newArr);
    console.log("DELETE")
  }

  return ( 
    <div className='container'>
      <h1>To-Do App</h1>

      <TaskInput
        inputText={inputText}
        onTaskSubmit={orihandleSubmit}
        onTextChange={orihandleTextChange}
      /><br></br>

      <TaskTableList 
        taskList={taskList}
        onDone={handleDone}
        onDel={handleDelBtn}
      />

      <ClearAllTask 
        onClearAll={orihandleClearAll}
      />
    </div>
   );
}

export default App;
