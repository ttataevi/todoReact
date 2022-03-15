import React, { useState } from 'react';

export function Task(props) {

	const [currText, SetCurrText] = useState(props.name);
	let toEdit = false;
	[...props.currEditItems].map((currElem) => {
		if (currElem === props.currKey) {
			toEdit = true;
		}
		return currElem;
	})


	const deleteItem = (currId) => {
		const filteredVersion = [...props.myArr].filter((elem) => elem.currKey !== currId);
		props.setArr(filteredVersion);

		const newButtons = [];
		for (let i = 0; i < Math.ceil((props.myArr.length - 1) / 5); i++) {
			const newOne = {'number': i + 1, 'id': Date.now()};
			newButtons.push(newOne);
		}
		props.setButtons(newButtons);
		if (props.myArr.length - 1 === 0) {
			const newOne = {'number': 1, 'id': Date.now()};
			newButtons.push(newOne);
			props.setButtons(newButtons);
		}
		if (props.currPage === props.buttons.length && (props.myArr.length - 1) % 5 === 0) {
			props.setCurrPage(props.currPage - 1);
		}

	}

	const deleteFromEdits = (currId) => {
		const filteredVersion = [...props.currEditItems].filter((elem) => elem !== currId);
		props.setCurrEditItem(filteredVersion);
	}

	const addToEdits = (currId, currName) => {
		props.setCurrEditItem([...props.currEditItems].concat(currId));
		SetCurrText(currName);
	}


	const changedItem = (currId) => {
		let updatedTodos = [...props.myArr].map((currElem) => {
			if (currElem.currKey === currId) {
				currElem.completed = !currElem.completed;
			}
			return currElem;
		});
		props.setArr(updatedTodos);
	}

	const saveEdit = (currId) => {
		if(currText.trim().length === 0){
			alert('Text is empty!')
		} else {
			let updatedTodos = [...props.myArr].map((currElem) => {
				if (currElem.currKey === currId) {
					currElem.name = currText;
				}
				return currElem;
			});
			props.setArr(updatedTodos);
			const filteredVersion = [...props.currEditItems].filter((elem) => elem !== currId);
			props.setCurrEditItem(filteredVersion);
			SetCurrText('');
		}

	}

	if (toEdit) {

		return (
			<div className="right" key={props.currKey}>
				<input type="text" name="edit" value={currText} onChange={(e) => SetCurrText(e.target.value)}
				       maxLength="40"/>
				<button className="btn btn-warning" onClick={() => deleteFromEdits(props.currKey)}> cancel</button>
				<button className="btn btn-success" onClick={() => saveEdit(props.currKey)}>save</button>
			</div>
		);
	}

	return (
		<div className='right' key={props.currKey}>
			<input type="checkbox" className="form-check-input" checked={props.completed}
			       onChange={() => changedItem(props.currKey)}/>
			<h1 className={props.completed ? 'line' : 'basic'}>{props.name}</h1>
			<button className='btn btn-danger' onClick={() => deleteItem(props.currKey)}> Delete</button>
			<button className='btn btn-success' onClick={() => addToEdits(props.currKey, props.name)}>Edit</button>
		</div>
	);
}