import games from '../schemas/games';
import { Route } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'kick-player',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const socketId = req.body.socketId;

		const socket = sockets.find(x => x.id === socketId);
		if (socket) {
			await games.updateOne(
				{ gameId },
				{
					$pull: {
						socketIds: {
							socketId
						}
					}
				}
			);

			io.to(gameId).emit('playerKick', {
				socketId
			});

			socket.leave(gameId);

			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}
};

export default route;
