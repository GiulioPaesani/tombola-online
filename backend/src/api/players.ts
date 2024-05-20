import { Router } from 'express';
import games from '../schemas/games';

const players = Router();

players.post('/players', async (req, res) => {
	const gameId = req.body.gameId;

	const game = await games.findOne({ gameId });

	if (game) {
		res.send(game.socketIds);
	} else {
		res.sendStatus(404);
	}
});

export default players;
