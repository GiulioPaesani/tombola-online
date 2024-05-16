import games from '../schemas/games';
import { Route, EventType } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'add-player-to-game',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const socketId = req.body.socketId;
		const username = req.body.username;

		console.log(
			gameId,
			socketId,
			sockets.map(x => x.id)
		);

		const socket = sockets.find(x => x.id === socketId);
		if (socket) {
			socket.join(gameId);

			let game = await games.findOne({ gameId });
			if (!game) return res.sendStatus(404);

			const { minCards, maxCards } = game;

			game = await games.findOneAndUpdate(
				{ gameId },
				{
					$push: {
						socketIds: {
							socketId,
							username,
							avatarUrl: '',
							numCards: minCards === maxCards ? minCards : null
						}
					}
				},
				{
					new: true
				}
			);

			io.to(gameId).emit(EventType.PlayersUpdate, game?.socketIds, {
				event: 'PlayerJoin',
				socketId
			});

			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}
};

export default route;
