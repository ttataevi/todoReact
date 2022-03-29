import React from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

export const Pagination = ({numberOfButtons}) => {

	const pagination = [];
	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	for (let i = 1; i <= numberOfButtons; i++) {
		let itemVariant = state.currentPage === i ? "contained" : "secondary";
		pagination.push(<Button
			variant={itemVariant}
			color="success"
			size="large"
			key={`pagination-${i}`}
			onClick={() => dispatch(setCurrentPage(i))}>
			{i}
		</Button>)
	}

	return (
		<div>
			{pagination}
		</div>
	)

}
