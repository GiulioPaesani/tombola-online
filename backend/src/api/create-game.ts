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

	//! Controllo game options

	await games.create({
		gameId,
		gameCode,
		...gameOptions
	});

	res.send({
		gameId,
		gameCode
	});
});

export default createGame;
