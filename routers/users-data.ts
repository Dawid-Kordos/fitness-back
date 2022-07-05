import {Router} from "express";
import {UsersDataRecord} from "../records/users-data.record";

export const userDataRouter = Router();

userDataRouter

    .get('/:id', async (req, res) => {
        const {id} = req.params;
        const user = await UsersDataRecord.getOne(id);
        res.json(user);
    })

    .get('/', async(req, res) => {
        const users = await UsersDataRecord.getAll();
        res.json(users);
    })

    .post('/', async (req, res) => {
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

        res.json(id); //name: user.firstName,
    });
