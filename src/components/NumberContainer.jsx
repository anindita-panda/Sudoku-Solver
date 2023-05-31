import { React, useState } from "react";
import "./SudokuContainer.css";

export const NumberContainer = (props) => {
	return (
		<div
			style={{
				color:
					props?.row === props?.rowCol[0] && props?.col === props?.rowCol[1]
						? "yellow"
						: "",
			}}
			className={!props.val ? `col border` : `col border bg-light`}>
			{" "}
			<h2>{props.val}</h2>
		</div>
	);
};
