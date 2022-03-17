import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";

export const Task = ({deleteItemById, item, saveElementChangeById}) => {
	const [currentText, setCurrentText] = useState(item.name);
	const [isEditMode, setEditMode] = useState(false);

	const saveItemChange = () => {
		if (currentText.trim().length === 0) {
			alert('Text is empty!')
		} else {
			saveElementChangeById(item.id, {...item, name: currentText})
			setEditMode(false);
		}
	}

	return <Container className="right" key={item.id}>
		{isEditMode ? (
				<>
					<input
						type="text"
						value={currentText}
						onChange={(e) => setCurrentText(e.target.value)}
						maxLength="40"/>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							setEditMode(false);
							setCurrentText(item.name);
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
						className="btn btn-success" onClick={() => setEditMode(true)}>Edit</Button>
				</>)
		}
	</Container>
}

