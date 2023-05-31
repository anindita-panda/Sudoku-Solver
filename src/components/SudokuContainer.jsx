import { useRef } from "react";
import { Button, Stack } from "react-bootstrap";
import { NumberContainer } from "./NumberContainer";
import "./SudokuContainer.css";

export const SudokuContainer = ({ setArray, array, setRowCol, rowCol }) => {
	// How to get the deep copy of the array
	const getDeepCopy = (whatever) => {
		return JSON.parse(JSON.stringify(whatever));
	};

	function wait(delay) {
		return new Promise((res) => setTimeout(res, delay));
	}

	const changeArrayEl = async (row, col, value) => {
		await wait(10);

		setRowCol([row, col]);

		setArray((prev) => {
			return prev.map((elem, i) => {
				if (i === row) {
					return elem.map((el, j) => {
						if (j === col) return value;
						else return el;
					});
				} else return elem;
			});
		});

		await wait(10);
	};

	function isValid(arr, row, col, value) {
		function validateBox(arr, row, col, value) {
			row = Math.floor(row / 3) * 3;
			col = Math.floor(col / 3) * 3;
			var isFound = false;
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					if (arr[row + i][col + j] == parseInt(value)) isFound = true;
				}
			}
			return isFound;
		}

		function validateRow(arr, row, col, value) {
			var isFound = false;
			for (var i = 0; i < 9; i++) {
				if (arr[row][i] === parseInt(value)) isFound = true;
			}
			return isFound;
		}

		function validateColumn(arr, row, col, value) {
			var isFound = false;
			for (var i = 0; i < 9; i++) {
				if (arr[i][col] === parseInt(value)) isFound = true;
			}
			return isFound;
		}

		if (
			validateColumn(arr, row, col, value) ||
			validateRow(arr, row, col, value) ||
			validateBox(arr, row, col, value)
		) {
			return false;
		} else {
			return true;
		}
	}

	const solveSudoku = async (arr, row = 0, col = 0, ans, ansFound) => {
		await wait(10);

		if (row === 9) {
			for (let i = 0; i < arr.length; i++) {
				let internalArr = [];
				for (let j = 0; j < arr.length; j++) {
					internalArr.push(arr[i][j]);
				}
				ans.push(internalArr);
			}
			console.log("it has returned");
			return true;
		}

		let nextRow = 0;
		let nextCol = 0;

		if (col === 8) {
			nextRow = row + 1;
			nextCol = 0;
		} else {
			nextRow = row;
			nextCol = col + 1;
		}
		if (!ansFound) {
			if (arr[row][col] !== 0) {
				ansFound = await solveSudoku(arr, nextRow, nextCol, ans, ansFound);
			} else {
				for (var value = 1; value < 10; value++) {
					if (isValid(arr, row, col, value)) {
						arr[row][col] = value;
						await changeArrayEl(row, col, value);
						ansFound = await solveSudoku(arr, nextRow, nextCol, ans, ansFound);
						console.log("backtracking");
						if (!ansFound) {
							await changeArrayEl(row, col, 0);
							arr[row][col] = 0;
						}
					}
				}
			}
		}

		return ansFound;
	};

	const btn = useRef(null);

	const driverFunction = async () => {
		btn.current.disabled = true;
		const sudoku = getDeepCopy(array);
		const ans = [];
		await solveSudoku(sudoku, 0, 0, ans);
		setArray(ans);
	};

	const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIdx) => {
		return (
			<Stack
				key={rIdx}
				direction='horizontal'>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIdx) => (
					<NumberContainer
						key={cIdx}
						val={array && array[row][col]}
						row={row}
						col={col}
						rowCol={rowCol}
					/>
				))}
			</Stack>
		);
	});

	return (
		<>
			{cells}
			<Button
				ref={btn}
				onClick={driverFunction}>
				Solve Sudoku
			</Button>
		</>
	);
};
