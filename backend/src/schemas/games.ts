import { Schema, SchemaTypes, model } from 'mongoose';

export type Game = {
	gameId: string;
	gameCode: string;
	winCases: {
		ambo: boolean;
		terno: boolean;
		cinquina: boolean;
		decina: boolean;
		tombola: boolean;
	};
	maxPlayers: number;
	minCards: number;
	maxCards: number;
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
	winCases: {
		ambo: SchemaTypes.Boolean,
		terno: SchemaTypes.Boolean,
		cinquina: SchemaTypes.Boolean,
		decina: SchemaTypes.Boolean,
		tombola: SchemaTypes.Boolean
	},
	maxPlayers: SchemaTypes.Number,
	minCards: SchemaTypes.Number,
	maxCards: SchemaTypes.Number
});

gameSchema.index({ gameId: 1 });

export default model('games', gameSchema, 'games');
