import {Router} from "express";
import {UsersDataRecord} from "../records/users-data.record";

export const userDataRouter = Router();

userDataRouter

    .post('/', async(req, res) => {
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

        res.json({
            name: user.firstName,
            id,
        });
    });
