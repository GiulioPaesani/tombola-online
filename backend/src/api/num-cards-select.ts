import games from '../schemas/games';
import { Route } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'num-cards-select',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const socketId = req.body.socketId;
		const numCards = req.query.numCards;

		const socket = sockets.find(x => x.id === socketId);

		if (socket) {
			const game = await games.findOneAndUpdate(
				{ gameId, 'socketIds.socketId': socketId },
				{
					'socketIds.$.numCards': numCards
				},
				{
					new: true
				}
			);

			io.to(gameId).emit('playersUpdate', game?.socketIds);

			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}
};

export default route;
