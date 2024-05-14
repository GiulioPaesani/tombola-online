import games from '../schemas/games';
import { Route } from '../types';

const route: Route = {
	method: 'POST',
	path: 'players',
	handler: async (req, res) => {
		const gameId = req.body.gameId;

		const game = await games.findOne({ gameId });

		if (game) {
			res.status(200).send(game.socketIds);
		} else {
			res.sendStatus(404);
		}
	}
};

export default route;
