import { Card } from '../../../types';

const stessaDecina = (num1: number, num2: number) => {
	return Math.floor(num1 / 10) === Math.floor(num2 / 10) || (Math.floor(num1 / 10) === 8 && Math.floor(num2 / 10) === 9);
};

const generateCard = () => {
	const rowNumbers: number[][] = [[], [], []];

	for (let i = 0; i < 15; i++) {
		const rowIndex = Math.floor(i / 5);
		let randomNumber: number = 0;

		do {
			randomNumber = Math.floor(Math.random() * 90) + 1;
		} while (rowNumbers.flat().includes(randomNumber) || rowNumbers[rowIndex].find(number => stessaDecina(number, randomNumber)));

		rowNumbers[rowIndex].push(randomNumber);
	}

	const card: Record<number, boolean> = {};
	for (let i = 0; i < rowNumbers.flat().length; i++) {
		card[rowNumbers.flat()[i]] = false;
	}

	return card as Card;
};

export default generateCard;
