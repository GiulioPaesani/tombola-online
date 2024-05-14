import games from '../schemas/games';
import { Route } from '../types';
import generateGameCode from '../utils/generateGameCode';

const route: Route = {
	method: 'POST',
	path: 'rigenerate-game-code',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const newGameCode = await generateGameCode();

		await games.updateOne({ gameId }, { gameCode: newGameCode });

		res.status(200).send({
			gameCode: newGameCode
		});
	}
};

export default route;
