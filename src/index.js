import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

function App(){

  const currRef = useRef(null);
  const [myArr, setArr]= useState([]);
  const [currEditItem, setCurrEditItem] = useState(null);
  const editText = useRef(null);
  const [currPage, setCurrPage] = useState(1);
  const [buttons, setbuttons] = useState([{number:1, id: Date.now()}])
  const addTask = () => {
    let currTask = currRef.current.value;
    if (currTask.trim().length === 0){
      alert("Text is empty!")
    } else{
      const currElem = {name: currTask , currKey : Date.now(), completed: false};
      setArr([...myArr].concat(currElem));
      if(myArr.length %5===0 && myArr.length!==0) {
        let newButton = {number : buttons.length +1, id : Date.now()};
        setCurrPage(currPage+1);
        setbuttons([...buttons].concat(newButton));
      }
    }
  }

  const deleteItem = (currId) => {
    const filteredVersion = [...myArr].filter((elem) => elem.currKey !== currId);
    setArr(filteredVersion);
    if((myArr.length-1)%5 ===0){
      setCurrPage(currPage-1)
    }

  }

  const changedItem = (currId) => {
    let updatedTodos = [...myArr].map((currElem) => {
      if (currElem.currKey === currId) {
        currElem.completed = !currElem.completed;
      }
      return currElem;
    });
    setArr(updatedTodos);
  }

  const saveEdit = (currId) =>{
    let updatedTodos = [...myArr].map((currElem) => {
      if (currElem.currKey === currId) {
        currElem.name = editText.current.value;
      }
      return currElem;
    });
    setArr(updatedTodos);
    setCurrEditItem(null);
  }

  function  Task(props){

    if (props.currKey === currEditItem){
      return (
        <div>
          <input type="text" name="edit" ref={editText} maxLength="40" />
          <button onClick={() =>setCurrEditItem(null)}> cancel</button>
          <button onClick={()=> saveEdit(props.currKey)}>save</button>
        </div>

      );
    }
    return (<div>
        <h1>{props.name}</h1>
        <input type="checkbox" checked={props.completed} onChange={()=> changedItem(props.currKey)} />
        <button onClick={() => deleteItem(props.currKey)}> Delete</button>
        <button onClick={()=>setCurrEditItem(props.currKey)}>Edit</button>
      </div>
    );
  }

  function Tasks() {
    let newArr = myArr.slice((currPage-1)*5,(currPage-1)*5+5)
    return (
      <ul>
        {newArr.map((elem) => {
          return <li key={ elem.currKey}>
            <Task name={elem.name} currKey={elem.currKey} completed={ elem.completed}/>
          </li>;
        })}
      </ul>
    )
  }

  function Buttons(){
    return (
     <div>
       {buttons.map((elem) => {
         return <button key={elem.id} onClick={() => setCurrPage(elem.number)}>{elem.number}</button>;
       })}
     </div>
    )
  }

return(
    <div>
      <input type="text" name="task" placeholder="enter your task:" ref={currRef} maxLength="40" />
      <input type="button" value="add" onClick={addTask}/>
      <Tasks/>
      <Buttons/>
      <label>currPage is: {currPage}</label>
    </div>
  );
}


ReactDOM.render(<App/>, document.getElementById('root'));