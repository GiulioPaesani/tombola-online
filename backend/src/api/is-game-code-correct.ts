import games from '../schemas/games';
import { Route } from '../types';

const route: Route = {
	method: 'POST',
	path: 'is-game-code-correct',
	handler: async (req, res) => {
		const gameCode = req.body.gameCode;

		const game = await games.findOne({ gameCode });

		res.status(200).send({
			gameId: game?.gameId ?? null
		});
	}
};

export default route;
