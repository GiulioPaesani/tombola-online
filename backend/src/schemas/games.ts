import { Schema, SchemaTypes, model } from 'mongoose';
import { Player } from '../types';

export type Game = {
	gameId: string;
	gameCode: string;
	state: 'lobby' | 'game';
	winCases: {
		ambo: boolean;
		terno: boolean;
		quaterna: boolean;
		cinquina: boolean;
		decina: boolean;
		tombola: boolean;
	};
	casesAlreadyWon: string[];
	maxPlayers: number;
	minCards: number;
	maxCards: number;
	socketIds: Player[];
	extractedNumbers: number[];
};

const gameSchema = new Schema<Game>({
	gameId: {
		type: SchemaTypes.String,
		immutable: true,
		required: true,
		unique: true
	},
	gameCode: {
		type: SchemaTypes.String,
		required: true,
		unique: true
	},
	state: {
		type: SchemaTypes.String,
		default: 'lobby'
	},
	winCases: {
		ambo: SchemaTypes.Boolean,
		terno: SchemaTypes.Boolean,
		quaterna: SchemaTypes.Boolean,
		cinquina: SchemaTypes.Boolean,
		decina: SchemaTypes.Boolean,
		tombola: SchemaTypes.Boolean
	},
	casesAlreadyWon: [SchemaTypes.String],
	maxPlayers: SchemaTypes.Number,
	minCards: SchemaTypes.Number,
	maxCards: SchemaTypes.Number,
	socketIds: [
		{
			socketId: SchemaTypes.String,
			username: SchemaTypes.String,
			avatarUrl: SchemaTypes.String,
			numCards: SchemaTypes.Number,
			cards: [SchemaTypes.Mixed],
			formattedCards: [SchemaTypes.Mixed]
		}
	],
	extractedNumbers: [SchemaTypes.Number]
});

gameSchema.index({ gameId: 1 });

export default model('games', gameSchema, 'games');
