import { Router } from 'express';
import generateCard from '../utils/generateCard';
import formatCard from '../utils/formatCard';

const cards = Router();

cards.get('/generate-cards/:numCards', async (req, res) => {
	const numCards = parseInt(req.params.numCards);

	if (numCards < 1 || numCards > 8) return res.sendStatus(400);

	const cards = [];

	for (let i = 0; i < numCards; i++) {
		cards.push(generateCard());
	}

	const formattedCards = [];
	for (let i = 0; i < cards.length; i++) {
		formattedCards.push(formatCard(cards[i]));
	}

	res.send({
		cards,
		formattedCards
	});
});

export default cards;
