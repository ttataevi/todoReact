import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Buttons } from './components/Buttons';
import { Task } from './components/Task';

function App() {

	const maxNumberOnPage = 5;
	const newTask = useRef(null);
	const [elems, setElems] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [buttons, setButtons] = useState([{'number': 1, 'id': Date.now()}]);

	const enterClicked = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	}

	const addTask = () => {
		if (newTask.current.value.trim().length === 0) {
			alert('Text is empty!')
		} else {
			setElems([...elems].concat({'name': newTask.current.value, 'currKey': Date.now(), 'completed': false, 'editVal': newTask.current.value}));
			let page = buttons.length;
			if (elems.length % maxNumberOnPage === 0 && elems.length !== 0) {
				page = currPage +1;
				setButtons([...buttons].concat({'number': buttons.length + 1, 'id': Date.now()}))
			}
			setCurrPage(page);
			newTask.current.value = '';
		}
	}

	return (
		<div className="container p-3 my-4">
			<input type="text" name="task" placeholder="enter your task:" ref={newTask} maxLength="40"
			       onKeyDown={enterClicked}/>
			<input type="button" className="btn btn-primary" value="add"
			       onClick={addTask}/>
			<ul>
				{elems.slice((currPage - 1) * maxNumberOnPage, (currPage - 1) * maxNumberOnPage + maxNumberOnPage).map((elem) => {
							return <li key={elem.currKey}>
									<Task name={elem.name} currKey={elem.currKey} completed={elem.completed} elems={elems}
						      setElems={setElems} buttons={buttons} setButtons={setButtons} currPage={currPage} setCurrPage={setCurrPage}
									/>
					</li>;
				})}
			</ul>
			<Buttons buttons={buttons} setCurrPage={setCurrPage}/>
		</div>
	);

}

ReactDOM.render(<App/>, document.getElementById('root'));
