import games from '../schemas/games';
import { Route, GameOptions } from '../types';
import generateGameCode from '../utils/generateGameCode';
import { v4 as uuidv4 } from 'uuid';

const route: Route = {
	method: 'POST',
	path: 'create-game',
	handler: async (req, res) => {
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
	}
};

export default route;
