import { Request, Response } from 'express';

type Route = {
	method: 'GET' | 'POST';
	path: string;
	handler: (req: Request, res: Response) => void;
};
