import games from '../schemas/games';
import { Route } from '../types';
import generateGameCode from '../utils/generateGameCode';

const route: Route = {
	method: 'POST',
	handler: async (req, res) => {
		const gameCode = await generateGameCode();
		const gameId = new Date().getTime().toString();

		await games.create({
			gameId,
			gameCode
		});

		res.status(200).send({
			gameId,
			gameCode
		});
	}
};

export default route;
