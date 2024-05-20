import { Router } from 'express';
import games from '../schemas/games';

const players = Router();

players.get('/players/:gameId', async (req, res) => {
	const gameId = req.params.gameId;

	const game = await games.findOne({ gameId });
	if (!game) return res.sendStatus(404);

	res.send(game.socketIds);
});

export default players;
