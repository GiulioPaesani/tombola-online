import { Card, FormattedCard } from '../types';

const indexOfMinRow = (formattedCard: FormattedCard) => {
	let minIndex = 0;
	let minLength = formattedCard[0].filter(number => number !== 0).length;

	for (let i = 1; i < formattedCard.length; i++) {
		const rowLength = formattedCard[i].filter(number => number !== 0).length;

		if (rowLength < minLength) {
			minLength = rowLength;
			minIndex = i;
		}
	}

	return minIndex;
};

const indexOfMaxRow = (formattedCard: FormattedCard) => {
	let maxIndex = 0;
	let maxLength = formattedCard[0].filter(number => number !== 0).length;

	for (let i = 1; i < formattedCard.length; i++) {
		const rowLength = formattedCard[i].filter(number => number !== 0).length;

		if (rowLength > maxLength) {
			maxLength = rowLength;
			maxIndex = i;
		}
	}

	return maxIndex;
};

const orderRows = (formattedCard: FormattedCard) => {
	for (let col = 0; col < formattedCard[0].length; col++) {
		if ([formattedCard[0][col], formattedCard[1][col], formattedCard[2][col]].filter(x => x).length > 1) {
			const element1 = formattedCard[0][col];
			const element2 = formattedCard[1][col];
			const element3 = formattedCard[2][col];

			const orderedCol = [element1, element2, element3].filter(x => x).sort();

			let x = 0;
			[element1, element2, element3].forEach((number, index) => {
				if (number !== 0) {
					formattedCard[index][col] = orderedCol[x];
					x++;
				}
			});
		}
	}

	return formattedCard;
};

const formatCols = (formattedCard: FormattedCard, colonneGiaFatte: number[]) => {
	const minElementRow = indexOfMinRow(formattedCard);
	const maxElementRow = indexOfMaxRow(formattedCard);

	const colsToFormat = formattedCard[maxElementRow]
		.map((x, index) => index)
		.filter(col => formattedCard[maxElementRow][col] && (!formattedCard[0][col] || !formattedCard[1][col] || !formattedCard[2][col]))
		.filter(x => !colonneGiaFatte.includes(x));

	const randomColToFormat = colsToFormat[Math.floor(Math.random() * colsToFormat.length)];

	const temp = formattedCard[minElementRow][randomColToFormat];
	formattedCard[minElementRow][randomColToFormat] = formattedCard[maxElementRow][randomColToFormat];
	formattedCard[maxElementRow][randomColToFormat] = temp;

	if (formattedCard.some(row => row.filter(number => number !== 0).length > 5)) {
		formattedCard = formatCols(formattedCard, colonneGiaFatte);
	}

	return orderRows(formattedCard);
};

const formatCard = (card: Card) => {
	const numbers = Object.keys(card).map(Number);

	let formattedCard: FormattedCard = [[], [], []];

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 9; col++) {
			formattedCard[row].push(0);
		}
	}

	for (let i = 0; i < numbers.length; i++) {
		const number = numbers[i];

		let decina = Math.floor(number / 10);
		if (decina === 9) decina = 8;

		const emptyRow = [formattedCard[0][decina], formattedCard[1][decina], formattedCard[2][decina]].findIndex(x => x === 0);

		formattedCard[emptyRow][decina] = number;
	}

	if (formattedCard.some(row => row.filter(number => number !== 0).length > 5)) {
		formattedCard = formatCols(formattedCard, []);
	}

	return formattedCard;
};

export default formatCard;
