import { Router } from 'express';
import games from '../schemas/games';
import { GameOptions } from '../types';
import generateGameCode from '../utils/generateGameCode';
import { v4 as uuidv4 } from 'uuid';

const createGame = Router();

createGame.post('/create-game', async (req, res) => {
	const gameCode = await generateGameCode();
	const gameId = uuidv4();

	const gameOptions = req.body as GameOptions;

	const { winCases, maxPlayers, minCards, maxCards } = gameOptions;

	if (!winCases.tombola) return res.sendStatus(400);
	if (maxPlayers <= 0 || maxPlayers >= 500) return res.sendStatus(400);
	if (minCards <= 0 || maxCards <= 0 || minCards > maxCards) return res.sendStatus(400);

	await games.create({
		gameId,
		gameCode,
		winCases,
		maxPlayers,
		minCards,
		maxCards
	});

	res.send({
		gameId,
		gameCode
	});
});

export default createGame;
