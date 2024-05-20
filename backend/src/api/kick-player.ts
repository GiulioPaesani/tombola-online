import { Router } from 'express';
import games from '../schemas/games';
import { EventType } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const kickPlayer = Router();

kickPlayer.post('/kick-player', async (req, res) => {
	const gameId = req.body.gameId;
	const socketId = req.body.socketId;

	const socket = sockets.find(x => x.id === socketId);
	if (socket) {
		const game = await games.findOneAndUpdate(
			{ gameId },
			{
				$pull: {
					socketIds: {
						socketId
					}
				}
			},
			{
				new: true
			}
		);

		if (!game) return res.sendStatus(404);

		io.to(gameId).emit(EventType.PlayersUpdate, game.socketIds, {
			event: 'PlayerKick',
			socketId
		});

		socket.leave(gameId);

		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
});

export default kickPlayer;
