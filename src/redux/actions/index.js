export const actionTypes = {
	ADD_TASK: 'ADD_TASK',
	DELETE_TASK: 'DELETE_TASK',
	SET_PAGE: 'SET_PAGE',
	CHANGE_TASK: 'CHANGE_TASK',
	SET_USER: 'SET_USER',
}

export const setUser = (user) => {
	return {
		type: actionTypes.SET_USER,
		payload: user
	}
}
export const addNewTask = (newTask) => {
	return {
		type: actionTypes.ADD_TASK,
		payload: newTask
	}
}

export const deleteTask = (taskId) => {
	return {
		type: actionTypes.DELETE_TASK,
		payload: taskId
	}
}

export const setCurrentPage = (newPage) => {
	return {
		type: actionTypes.SET_PAGE,
		payload: newPage
	}
}

export const saveChangeByItemId = (id, changedItem) => {
	return {
		type: actionTypes.CHANGE_TASK,
		payload: {id, changedItem}
	}
}


