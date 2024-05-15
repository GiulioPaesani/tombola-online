import games from '../schemas/games';
import { Route } from '../types';
import generateGameCode from '../utils/generateGameCode';

const route: Route = {
	method: 'POST',
	path: 'rigenerate-game-code',
	handler: async (req, res) => {
		const gameId = req.body.gameId;
		const newGameCode = await generateGameCode();

		const game = await games.findOneAndUpdate({ gameId }, { gameCode: newGameCode }, { new: true });

		if (!game) return res.sendStatus(404);

		res.send({
			gameCode: game.gameCode
		});
	}
};

export default route;
