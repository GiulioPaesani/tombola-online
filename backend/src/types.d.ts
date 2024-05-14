import { Request, Response } from 'express';

type Route = {
	method: 'GET' | 'POST';
	handler: (req: Request, res: Response) => void;
};
