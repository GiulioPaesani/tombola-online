import { Router } from 'express';
import games from '../schemas/games';
import generateGameCode from '../utils/generateGameCode';

const rigenerateGameCode = Router();

rigenerateGameCode.post('/rigenerate-game-code', async (req, res) => {
	const gameId = req.body.gameId;
	const newGameCode = await generateGameCode();

	const game = await games.findOneAndUpdate({ gameId }, { gameCode: newGameCode }, { new: true });
	if (!game) return res.sendStatus(404);

	res.send({
		gameCode: game.gameCode
	});
});

export default rigenerateGameCode;
