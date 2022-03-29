import { actionTypes } from '../actions';

const reducer = (state, action) => {
	switch (action.type) {
		case(actionTypes.ADD_TASK):
			return {
				...state,
				items: [...state.items, action.payload]
			}
		case (actionTypes.SET_PAGE):
			return {
				...state,
				currentPage: action.payload
			}
		case (actionTypes.DELETE_TASK):
			let newArr = state.items.filter((item) => item.id !== action.payload);
			return {
				...state,
				items: newArr
			}

		case (actionTypes.CHANGE_TASK):
			let changedArr = state.items.map((item) => item.id === action.payload.id ? action.payload.changedItem : item)
			return {
				...state,
				items: changedArr
			}
		case (actionTypes.SET_USER):
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}
export default reducer;