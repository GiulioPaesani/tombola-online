import { Router } from 'express';
import games from '../schemas/games';
import { EventType } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const selectNumCards = Router();

selectNumCards.post('/select-num-cards', async (req, res) => {
	const gameId = req.body.gameId;
	const socketId = req.body.socketId;
	const numCards = req.body.numCards;

	const socket = sockets.find(x => x.id === socketId);
	if (!socket) return res.sendStatus(404);

	const game = await games.findOneAndUpdate(
		{ gameId, 'socketIds.socketId': socketId },
		{
			'socketIds.$.numCards': numCards
		},
		{
			new: true
		}
	);

	if (!game) return res.sendStatus(404);

	io.to(gameId).emit(EventType.PlayersUpdate, game?.socketIds, {
		event: 'PlayerCardsSelect',
		socketId
	});

	res.sendStatus(200);
});

export default selectNumCards;
