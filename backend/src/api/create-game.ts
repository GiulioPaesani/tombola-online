import games from '../schemas/games';
import { Route } from '../types';
import generateGameCode from '../utils/generateGameCode';
import { GameOptions } from '../../../types/general';
import { v4 as uuidv4 } from 'uuid';

const route: Route = {
	method: 'POST',
	path: 'create-game',
	handler: async (req, res) => {
		const gameCode = await generateGameCode();
		const gameId = uuidv4();

		const gameOptions = req.body as GameOptions;

		await games.create({
			gameId,
			gameCode,
			...gameOptions
		});

		res.status(200).send({
			gameId,
			gameCode
		});
	}
};

export default route;
