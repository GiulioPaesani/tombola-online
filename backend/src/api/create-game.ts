import { Route } from '../types';

const route: Route = {
	method: 'POST',
	handler: (req, res) => {
		res.sendStatus(200);
	}
};

export default route;
