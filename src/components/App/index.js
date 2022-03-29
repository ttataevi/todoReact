import { Pagination } from "../Pagination";
import { Task } from "../Task";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import './appStyle.css';
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewTask, deleteTask, saveChangeByItemId, setCurrentPage } from "../../redux/actions";
import axios from "axios";


const App = () => {

	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	const maxItemOnPerPage = 5;
	const newTaskValue = useRef(null);

	useEffect(() => {
		axios.post('http://localhost:5000/', {"user": state.user}).then(response => {
				for (let i = 0; i < response.data.length; i++) {
					dispatch(addNewTask(response.data[i]));
				}
			}
		);
	}, []);

	const enterClicked = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	}


	const deleteItemById = (id) => {
		axios.post('http://127.0.0.1:5000/delete', {
			'id': id
		}).then();
		dispatch(deleteTask(id));
		if (state.items.length % 5 === 1 && state.currentPage !== 1) {
			dispatch(setCurrentPage(state.currentPage - 1));
		}
	}

	const saveElementChangeById = (id, changedItem) => {

		axios.post('http://127.0.0.1:5000/check', {
			'id': id,
			'newElem': changedItem,
		});
		dispatch(saveChangeByItemId(id, changedItem));
	}

	const addTask = () => {

		if (newTaskValue.current.value.trim().length === 0) {
			alert('Text is empty!')
		} else {

			axios.post('http://127.0.0.1:5000/add', {
				'name': newTaskValue.current.value.trim(),
				'user': state.user
			}).then((response) => {
				dispatch(addNewTask({
					name: newTaskValue.current.value,
					id: response.data.returnedId,
					completed: false,
					currentText: newTaskValue.current.value,
					isEditMode: false
				}))

				newTaskValue.current.value = '';
				if (state.items.length % 5 === 0 && state.items.length !== 0) {
					dispatch(setCurrentPage(state.currentPage + 1));
				}

			});
		}
	}

	return (
		<Container sx={{mx: 30, m: 10}} maxWidth="lg">
			<input

				type="text"
				name="task"
				placeholder="enter your task:"
				ref={newTaskValue}
				maxLength="40"
				onKeyDown={enterClicked}
			/>
			<Button
				variant="contained"
				color="success"
				onClick={() => addTask()}>add</Button>

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
		</Container>
	);

}

export default App;