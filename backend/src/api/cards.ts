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

		const player = game.socketIds.find(socket => socket.socketId === socketId);

		if (!player) return res.sendStatus(404);

		const { cards, formattedCards } = player;

		res.send({
			cards,
			formattedCards
		});
	}
};

export default route;
