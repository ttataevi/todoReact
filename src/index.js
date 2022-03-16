import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Pagination } from './components/Pagination';
import { Task } from './components/Task';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {

	const maxItemOnPerPage = 5;
	const newTaskValue = useRef(null);
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const enterClicked = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	}

	const deleteItemById = (id) => {
		setItems(items.filter((item) => item.id !== id));
		if (items.length % 5 === 1 && currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	const saveElementChangeById = (id, changedItem) => {
		setItems(items.map((item) => item.id === id ? changedItem : item));
	}

	const addTask = () => {
		if (newTaskValue.current.value.trim().length === 0) {
			alert('Text is empty!')
		} else {
			setItems([...items, {
				name: newTaskValue.current.value,
				id: Date.now(),
				completed: false,
			}]);
			newTaskValue.current.value = '';
			if (items.length % 5 === 0 && items.length !== 0) {
				setCurrentPage(currentPage + 1);
			}
		}
	}

	return (
		<div className="container p-3 my-4">
			<input
				type="text"
				name="task"
				placeholder="enter your task:"
				ref={newTaskValue}
				maxLength="40"
				onKeyDown={enterClicked}
			/>
			<input type="button" className="btn btn-primary" value="add"
			       onClick={addTask}/>

			{items.slice((currentPage - 1) * maxItemOnPerPage, (currentPage - 1) * maxItemOnPerPage + maxItemOnPerPage).map((elem) => {
				return <Task
					key={elem.id}
					deleteItemById={deleteItemById}
					item={elem}
					saveElementChangeById={saveElementChangeById}
				/>;
			})}
			<Pagination
				numberOfButtons={Math.ceil(items.length / maxItemOnPerPage) > 0 ? Math.ceil(items.length / maxItemOnPerPage) : 1}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

ReactDOM.render(<App/>, document.getElementById('root'));
