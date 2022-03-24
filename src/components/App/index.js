import { Pagination } from "../Pagination";
import { Task } from "../Task";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import './appStyle.css';


import { useSelector } from "react-redux";
import { useRef } from "react";

import { useDispatch } from "react-redux";
import { addNewTask, deleteTask, saveChangeByItemId, setCurrentPage } from "../../redux/actions";
import { Link } from "react-router-dom";

 const App= ()=> {

	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	const maxItemOnPerPage = 5;
	const newTaskValue = useRef(null);

	const enterClicked = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	}

	const deleteItemById = (id) => {
		dispatch(deleteTask(id));
		if (state.items.length % 5 === 1 && state.currentPage !== 1) {
			dispatch(setCurrentPage(state.currentPage-1));
		}
	}

	const saveElementChangeById = (id, changedItem) => {
		dispatch(saveChangeByItemId(id,changedItem));
	}

	const addTask = () => {

		if (newTaskValue.current.value.trim().length === 0) {
			alert('Text is empty!')
		} else {
			dispatch(addNewTask({
				name: newTaskValue.current.value,
				id: Date.now(),
				completed: false,
				currentText: newTaskValue.current.value,
				isEditMode: false,
			}))

			newTaskValue.current.value = '';
			if (state.items.length % 5 === 0 && state.items.length !== 0) {
				dispatch(setCurrentPage(state.currentPage+1));
			}
		}
	}

	return (
		<Container sx={{ mx: 30, m : 10}} maxWidth="lg">
			<input

				type="text"
				name="task"
				placeholder="enter your task:"
				ref={newTaskValue}
				maxLength="40"
				onKeyDown={enterClicked}
			/>
			<Button
				variant = "contained"
				color = "success"
				onClick={() =>addTask()}>add</Button>

			{state.items.slice((state.currentPage - 1) * maxItemOnPerPage, (state.currentPage - 1) * maxItemOnPerPage + maxItemOnPerPage).map((elem) => {
				return <Task
					key={elem.id}
					deleteItemById={deleteItemById}
					item={elem}
					saveElementChangeById={saveElementChangeById}
				/>;
			})}
			<Pagination
				numberOfButtons={Math.ceil(state.items.length / maxItemOnPerPage) > 0 ? Math.ceil(state.items.length / maxItemOnPerPage) : 1}
			/>
			<Link to="/">Homepage</Link>
		</Container>
	);
}
export default App;