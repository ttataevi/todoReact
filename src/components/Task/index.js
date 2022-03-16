import React, { useState } from 'react';

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

	return <div className="right" key={item.id}>
		{isEditMode ? (
				<>
					<input
						type="text"
						value={currentText}
						onChange={(e) => setCurrentText(e.target.value)}
						maxLength="40"/>
					<button className="btn btn-warning" onClick={() => {
						setEditMode(false);
						setCurrentText(item.name);
					}}> cancel
					</button>
					<button className="btn btn-success" onClick={() => saveItemChange(item.id)}>save</button>
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
					<button className="btn btn-danger" onClick={() => deleteItemById(item.id)}> Delete</button>
					<button className="btn btn-success" onClick={() => setEditMode(true)}>Edit</button>
				</>)
		}
	</div>
}

