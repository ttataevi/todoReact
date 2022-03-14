import React from "react";

export function Buttons(props){
	return (
		<div>
			{props.buttons.map((elem) => {
				return <button key={elem.id} className="btn btn-primary active" onClick={() => props.setCurrPage(elem.number)}>{elem.number}</button>;
			})}
		</div>
	)
}
