import { Router } from 'express';
import games from '../schemas/games';

const cards = Router();

cards.post('/cards', async (req, res) => {
	const gameId = req.body.gameId;
	const socketId = req.body.socketId;

	let game = await games.findOne({ gameId });
	if (!game) return res.sendStatus(404);

	const player = game.socketIds.find(socket => socket.socketId === socketId);

	if (!player) return res.sendStatus(404);

	const { cards, formattedCards } = player;

	res.send({
		cards,
		formattedCards
	});
});

export default cards;
