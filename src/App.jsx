import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { SudokuContainer } from "./components/SudokuContainer";

const initial = [
	[0, 5, 0, 9, 0, 0, 0, 0, 0],
	[8, 0, 0, 0, 4, 0, 3, 0, 7],
	[0, 0, 0, 2, 8, 0, 1, 9, 0],
	[5, 3, 8, 6, 0, 7, 9, 4, 0],
	[0, 2, 0, 3, 0, 1, 0, 0, 0],
	[1, 0, 9, 8, 0, 4, 6, 2, 3],
	[9, 0, 7, 4, 0, 0, 0, 0, 0],
	[0, 4, 5, 0, 0, 0, 2, 0, 9],
	[0, 0, 0, 0, 3, 0, 0, 7, 0],
];

function App() {
	const getDeepCopy = (whatever) => {
		return JSON.parse(JSON.stringify(whatever));
	};

	const [array, setArray] = useState(getDeepCopy(initial));
	const [rowCol, setRowCol] = useState([-1, -1]);

	return (
		<div className='App'>
			<SudokuContainer
				array={array}
				setArray={setArray}
				setRowCol={setRowCol}
				rowCol={rowCol}
			/>
		</div>
	);
}

export default App;
