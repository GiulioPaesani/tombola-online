import games, { Game } from '../schemas/games';

const CODE_LENGTH = 5;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateGameCode = async () => {
	let gameCode = '';
	let game: Game | null = null;

	do {
		for (let i = 0; i < CODE_LENGTH; ++i) {
			gameCode += chars[Math.floor(Math.random() * chars.length)];
		}

		game = await games.findOne({ gameCode });
	} while (game);

	return gameCode;
};

export default generateGameCode;
