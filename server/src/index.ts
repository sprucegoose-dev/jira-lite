import express from 'express';
import cors from 'cors';
import http from 'http';

import { initDatabase } from '../database/connection';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const httpServer = http.createServer(app);

(async () => {
    await initDatabase();

	httpServer.listen(3000, () => {
		console.log('listening on *:3000');
	});
})();
