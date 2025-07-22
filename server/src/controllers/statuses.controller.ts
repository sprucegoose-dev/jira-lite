import { Request, Response } from 'express';
import Status from '../models/status.model';

class StatusesController {

    async getStatuses(_req: Request, res: Response) {
        const statuses = await Status.findAll();
        res.send(statuses);
    }
}

export default new StatusesController;
