import {Router} from "express";
import {UsersDataRecord} from "../records/users-data.record";
import {ValidationError} from "../utils/errors";

export const userDataRouter = Router();

userDataRouter

    .get('/:id', async (req, res) => {
        const {id} = req.params;
        const user = await UsersDataRecord.getOne(id);
        res.json(user);
    })

    .get('/', async (req, res) => {
        const users = await UsersDataRecord.getAll();
        res.json(users);
    })

    .post('/register', async (req, res) => {
        const {
            firstName, lastName, email, password,
        } = req.body

        const user = new UsersDataRecord({
            ...req.body,
            firstName,
            lastName,
            email,
            password,
        });

        const id = await user.insert();

        res.json(id);
    })

    .post('/sign-in', async (req, res) => {
        const {email, password} = req.body;

        if (email.trim().length < 7 || email.length > 75) {
            throw new ValidationError(`Email must have at least 7 and at most 75 characters, but you have entered ${email.trim().length}.`);
        }

        if (password.trim().length < 8 || password.length > 20) {
            throw new ValidationError('Password must have at least 8 and at most 20 characters');
        }

        let isOk: boolean = false;
        let userName: string = '';

        const users = await UsersDataRecord.getAll();

        users.forEach(user => {
            if (user.email === email && user.password === password) {
                isOk = true;
                userName = user.firstName;
            }
        });

        if (!isOk) {
            throw new ValidationError('Wrong email or password.');
        }

        res.json({
                isOk,
                userName,
            });
    });
