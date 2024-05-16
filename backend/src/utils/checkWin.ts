import { Card, FormattedCard, Player } from '../types';

export const checkAmbo = (card: Card, formattedCard: FormattedCard, player: Player) => {
	for (let i = 0; i < formattedCard.length; i++) {
		const row = formattedCard[i].filter(number => number);

		if (row.filter(number => card[number]).length >= 2) return [player];
	}

	return [];
};

export const checkTerno = (card: Card, formattedCard: FormattedCard, player: Player) => {
	for (let i = 0; i < formattedCard.length; i++) {
		const row = formattedCard[i].filter(number => number);

		if (row.filter(number => card[number]).length >= 3) return [player];
	}

	return [];
};

export const checkQuaterna = (card: Card, formattedCard: FormattedCard, player: Player) => {
	for (let i = 0; i < formattedCard.length; i++) {
		const row = formattedCard[i].filter(number => number);

		if (row.filter(number => card[number]).length >= 4) return [player];
	}

	return [];
};

export const checkCinquina = (card: Card, formattedCard: FormattedCard, player: Player) => {
	for (let i = 0; i < formattedCard.length; i++) {
		const row = formattedCard[i].filter(number => number);

		if (row.filter(number => card[number]).length >= 5) return [player];
	}

	return [];
};

export const checkDecina = (card: Card, formattedCard: FormattedCard, player: Player) => {
	let fullRows = 0;

	for (let i = 0; i < formattedCard.length; i++) {
		const row = formattedCard[i].filter(number => number);

		if (row.filter(number => card[number]).length >= 5) fullRows++;
	}

	if (fullRows >= 2) return [player];
	else return [];
};

export const checkTombola = (card: Card, formattedCard: FormattedCard, player: Player) => {
	if (Object.values(card).every(number => number)) return [player];
	else return [];
};
