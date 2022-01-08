import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import accountsView from '../views/accounts_view';

import User from '../models/User';
import Account from '../models/Account';

export default {

    async create(request: Request, response: Response) {

        const {
            name,
            description,
            type,
        } = request.body

        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail(request.headers.userId as string);

        const data = {
            name,
            description,
            type,
            user
        }

        const accountRepository = getRepository(Account);

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            type: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const account = accountRepository.create(data);
        
        await accountRepository.save(account);
    

        response.status(201).json({ account: accountsView.render(account) });
    },
}