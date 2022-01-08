import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userView from '../views/users_view';

import User from '../models/User';

export default {

    async index(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(request.headers.userId as string, {
            relations: ['categories', 'accounts', 'accounts.transactions'],
        });

        return response.json( { user: userView.render(user) } );
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id, {
            relations: ['categories', 'accounts', 'accounts.transactions'],
        });

        return response.json(userView.render(user));
    },

    async create(request: Request, response: Response) {

        const {
            name,
            email,
            cpf,
            password,
            rpassword,
        } = request.body

        const data = {
            name,
            email,
            cpf,
            password,
            rpassword,
            lastIp: request.socket.remoteAddress,
        }
    
        const userRepository = getRepository(User);

        const schema = Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório'),
            email: Yup.string().email().required('O email é obrigatório')
              .test('checkEmailUnique', 'O email já foi cadastrado!.', async function(value) {
                if (await userRepository.findOne({ email: value}, { select: ['id']}))
                  return false
                return true
              }),
            password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres')
              .test('match', 'As senhas não batem!', function (value) {
                return value === rpassword
              }),
            rpassword: Yup.string().required('A confirmação de senha é obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres')
              .test('match', 'As senhas não batem!', function (value) {
                return value === password
              }),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const user = userRepository.create(data);

        await userRepository.save(user);

        response.status(201).json({ user: userView.render(user) });
    },

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({email});

        if (!user) {
            return response.status(400).send({ errors: { email: ['User not found'] } })
        }

        if (! await bcrypt.compare(password, user.password)) {
            return response.status(400).send({ errors: { password: ['Invalid password'] } })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
            expiresIn: 86400,
        })

        response.status(200).send({ user: userView.render(user), token})

    }
}