import express from 'express';

const app = express();
import cors from 'cors';
import http from 'http';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log(`listening on *:3000`);
});
