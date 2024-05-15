import games from '../schemas/games';
import { Route } from '../types';

const route: Route = {
	method: 'POST',
	path: 'is-game-code-correct',
	handler: async (req, res) => {
		const gameCode = req.body.gameCode;

		const game = await games.findOne({ gameCode });

		if (!game) return res.send('Invalid code');

		const { gameId, winCases, maxPlayers, minCards, maxCards, socketIds } = game;

		if (maxPlayers !== 0 && socketIds.length >= maxPlayers) return res.send('Max players reached');

		res.send({
			gameId,
			winCases,
			maxPlayers,
			minCards,
			maxCards
		});
	}
};

export default route;
