import { Request, Response } from 'express';
import User from '../models/user.model';

class UsersController {

    async getUsers(_req: Request, res: Response) {
        const users = await User.findAll();
        res.send(users);
    }
}

export default new UsersController;
