import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Buttons } from './components/Buttons';
import { Task } from './components/Task';

function App() {

	const currRef = useRef(null);
	const [myArr, setArr] = useState([]);
	const [currEditItems, setCurrEditItem] = useState([]);
	const editText = useRef(null);
	const [currPage, setCurrPage] = useState(1);
	const [buttons, setButtons] = useState([{'number': 1, 'id': Date.now()}]);
	const [currText, setCurrText] = useState('');

	const enterClicked = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	}


	const addTask = () => {
		let currTask = currRef.current.value;
		if (currTask.trim().length === 0) {
			alert('Text is empty!')
		} else {
			const currElem = {name: currTask, currKey: Date.now(), completed: false};
			setArr([...myArr].concat(currElem));
			setCurrPage(buttons.length);
			if (myArr.length % 5 === 0 && myArr.length !== 0) {
				setCurrPage(currPage + 1);
				setButtons([...buttons].concat({'number': buttons.length + 1, 'id': Date.now()}))
			}
			currRef.current.value = '';
		}
	}


	return (
		<div className='container p-3 my-4'>
			<input type="text" name='task' placeholder='enter your task:' ref={currRef} maxLength='40'
			       onKeyDown={enterClicked}/>
			<input type='button' className='btn btn-primary' value='add' onClick={addTask}/>
			<ul>
				{myArr.slice((currPage - 1) * 5, (currPage - 1) * 5 + 5).map((elem) => {
					return <li key={elem.currKey}>
						<Task name={elem.name} currKey={elem.currKey} completed={elem.completed}
						      currEditItems={currEditItems} setCurrEditItem={setCurrEditItem} myArr={myArr}
						      setArr={setArr} editText={editText} SetCurrText={setCurrText}
						      currText={currText} buttons={buttons} setButtons={setButtons} currPage={currPage}
						      setCurrPage={setCurrPage}
						/>
					</li>;
				})}
			</ul>
			<Buttons buttons={buttons} setCurrPage={setCurrPage}/>
		</div>
	);
}

ReactDOM.render(<App/>, document.getElementById('root'));
