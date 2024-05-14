import games from '../schemas/games';
import { Route } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'add-player-to-game',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const socketId = req.body.socketId;
		const username = req.body.username;
		const playerType = req.query.playerType;

		const socket = sockets.find(x => x.id === socketId);
		if (socket) {
			socket.join(gameId);

			await games.updateOne(
				{ gameId },
				{
					$push: {
						socketIds: {
							socketId,
							username,
							avatarUrl: ''
						}
					}
				}
			);
			if (playerType === 'host') {
				await games.updateOne({ gameId }, { hostSocketId: socketId });
			}

			io.to(gameId).emit('playerJoin', {
				socketId,
				username,
				avatarUrl: ''
			});

			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	}
};

export default route;
