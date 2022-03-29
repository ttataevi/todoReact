import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import './style.css';

export const Task = ({deleteItemById, item, saveElementChangeById}) => {

	const saveItemChange = () => {
		if (item.currentText.trim().length === 0) {
			alert('Text is empty!')
		} else {
			saveElementChangeById(item.id, {...item, name: item.currentText, isEditMode: false})
		}
	}
	const editButtonClicked = () => {
		saveElementChangeById(item.id, {...item, isEditMode: true})
	}
	return <Container key={item.id}>
		{item.isEditMode ? (
				<>

					<input
						type="text"
						value={item.currentText}
						onChange={(e) => saveElementChangeById(item.id, {...item, currentText: e.target.value})}
						maxLength="40"/>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							item.isEditMode = false;
							saveElementChangeById(item.id, {...item, currentText: item.name})
						}}> cancel
					</Button>
					<Button
						variant="contained"
						color="success"
						onClick={() => saveItemChange(item.id)}>save</Button>


				</>
			)
			: (
				<>
					<div className="singleRow">
						<input
							type="checkbox"
							className="form-check-input"
							checked={item.completed}
							onChange={() => saveElementChangeById(item.id, {...item, completed: !item.completed})}/>
						<h1 className={item.completed ? "line" : "basic"}>{item.name}</h1>
						<Button
							variant="contained"
							color="error"
							size="small"
							onClick={() => deleteItemById(item.id)}> Delete</Button>
						<Button
							variant="contained"
							color="info"
							size="small"
							className="btn btn-success" onClick={() => editButtonClicked()}>Edit</Button>
					</div>
				</>)
		}
	</Container>
}

