import { Schema, SchemaTypes, model } from 'mongoose';

export type Game = {
	gameId: string;
	gameCode: string;
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
	}
});

gameSchema.index({ gameId: 1 });

export default model('games', gameSchema, 'games');
