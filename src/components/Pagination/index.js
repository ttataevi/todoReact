import React from "react";
import Button from '@mui/material/Button';


export const Pagination = ({numberOfButtons, currentPage, setCurrentPage}) => {
	const pagination = [];
	for (let i = 1; i <= numberOfButtons; i++) {
		let itemVariant =  currentPage === i ? "contained" : "secondary";
		pagination.push(<Button
			variant = {itemVariant}
			color="success"
			size="large"
			key={`pagination-${i}`}
			onClick={() => setCurrentPage(i)}>
			{i}
		</Button>)
	}
	return (
		<div>
			{pagination}
		</div>
	)
}
