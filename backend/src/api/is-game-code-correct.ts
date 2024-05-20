import { Router } from 'express';
import games from '../schemas/games';

const isGameCodeCorrect = Router();

isGameCodeCorrect.post('/is-game-code-correct', async (req, res) => {
	const gameCode = req.body.gameCode;

	const game = await games.findOne({ gameCode });
	if (!game) return res.send('Invalid code'); //? Farlo con lo status

	const { gameId, state, winCases, maxPlayers, minCards, maxCards, socketIds } = game;

	if (state !== 'lobby') return res.send('Game in progress');

	if (maxPlayers !== 0 && socketIds.length >= maxPlayers) return res.send('Max players reached');

	res.send({
		gameId,
		winCases,
		maxPlayers,
		minCards,
		maxCards
	});
});

export default isGameCodeCorrect;
