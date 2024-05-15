import { EventType } from '../../../types';
import games from '../schemas/games';
import { Route } from '../types';
import formatCard from '../utils/formatCard';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'cards',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const socketId = req.body.socketId;

		let game = await games.findOne({ gameId });
		if (!game) return res.sendStatus(404);

		const cards = game.socketIds.find(socket => socket.socketId === socketId)?.cards;

		if (!cards) return res.sendStatus(404);

		const formattedCards = [];
		for (let i = 0; i < cards.length; i++) {
			formattedCards.push(formatCard(cards[i]));
		}

		res.send({
			cards,
			formattedCards
		});
	}
};

export default route;
