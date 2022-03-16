import React from "react";

export const Pagination = ({numberOfButtons, currentPage, setCurrentPage}) => {
	const pagination = [];
	for (let i = 1; i <= numberOfButtons; i++) {
		pagination.push(<button
			key={`pagination-${i}`}
			className={`btn btn-primary ${currentPage === i && 'active'}`}
			onClick={() => setCurrentPage(i)}>
			{i}
		</button>)
	}
	return (
		<div>
			{pagination}
		</div>
	)
}
