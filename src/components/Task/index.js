import React, { useState } from 'react';

export function Task(props) {

	const [currText, setCurrText] = useState(props.name);
	const [isEditMode, setEditMode] = useState(false);
	const maxNumberOnPage = 5;

	const deleteItem = (currId) => {
		const deletedFromElems = [...props.elems].filter((elem) => elem.currKey !== currId);
		props.setElems(deletedFromElems);
		const newButtons = [];
		for (let i = 0; i < Math.ceil((props.elems.length - 1) / maxNumberOnPage); i++) {
			newButtons.push({'number': i + 1, 'id': Date.now()});
		}
		if (props.elems.length - 1 === 0) {
			newButtons.push({'number': 1, 'id': Date.now()});
		}
		props.setButtons(newButtons);
		if (props.currPage === props.buttons.length && (props.elems.length - 1) % maxNumberOnPage === 0) {
			props.setCurrPage(props.currPage - 1);
		}
	}

	const changeItemChecked = (currId) => {
		let updatedTodos = [...props.elems].map((currElem) => {
			if (currElem.currKey === currId) {
				currElem.completed = !currElem.completed;
			}
			return currElem;
		});
		props.setElems(updatedTodos);
	}

	const changeItemProps = (currId) => {
		if (currText.trim().length === 0) {
			alert('Text is empty!')
		} else {
			let updatedTodos = [...props.elems].map((currElem) => {
				if (currElem.currKey === currId) {
					currElem.name = currText;
				}
				return currElem;
			});
			props.setElems(updatedTodos);
			setEditMode(false);
			setCurrText('');
		}
	}

	return (isEditMode ?
			<div className="right" key={props.currKey}>
				<input type="text" name="edit" value={currText.toString()} onChange={(e) => setCurrText(e.target.value)}
				       maxLength="40"/>
				<button className="btn btn-warning" onClick={() => setEditMode(false)}> cancel</button>
				<button className="btn btn-success" onClick={() => changeItemProps(props.currKey)}>save</button>
			</div>
			:
			<div className="right" key={props.currKey}>
				<input type="checkbox" className="form-check-input" checked={props.completed}
				       onChange={() => changeItemChecked(props.currKey)}/>
				<h1 className={props.completed ? "line" : "basic"}>{props.name}</h1>
				<button className="btn btn-danger" onClick={() => deleteItem(props.currKey)}> Delete</button>
				<button className="btn btn-success" onClick={() => setEditMode(true)}>Edit</button>
			</div>
	);
}