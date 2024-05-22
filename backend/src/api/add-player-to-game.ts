import { Router } from 'express';
import games from '../schemas/games';
import { EventType } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const addPlayerToGame = Router();

addPlayerToGame.post('/add-player-to-game', async (req, res) => {
	const gameId = req.body.gameId;
	const socketId = req.body.socketId;
	const username = req.body.username;
	const avatarNum = req.body.avatarNum;

	const socket = sockets.find(x => x.id === socketId);
	if (!socket) return res.sendStatus(404);

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
					avatarNum,
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
});

export default addPlayerToGame;
