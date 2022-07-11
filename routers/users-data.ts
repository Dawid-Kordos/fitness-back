import {Router} from "express";
import {UsersDataRecord} from "../records/users-data.record";
import {ValidationError} from "../utils/errors";
import {decryptText, encryptText} from "../utils/cipher";
import {PWD, SALT} from "../utils/hash_pwd";
import {UserDataEntity} from "../types";

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
            firstName, lastName, email, password1,
        } = req.body;

        let {password, ivHex} = req.body;


        if (password.trim().length < 8 || password.length > 20) {
            throw new ValidationError('Password must have at least 8 and at most 20 characters');
        }

        if (password !== password1) {
            throw new ValidationError('Passwords are not the same.');
        }

        const allUsers = await UsersDataRecord.getAll();

        allUsers.map(user => {
            if (user.email === email) {
                throw new ValidationError('Account with this mail already exists.');
            }
        });

        const encryptedPassword = await encryptText(password, PWD, SALT);

        password = encryptedPassword.encrypted;
        ivHex = encryptedPassword.iv;

        const user = new UsersDataRecord({
            ...req.body,
            firstName,
            lastName,
            email,
            password,
            ivHex,
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

        let loginOk: boolean = false;
        let userName: string = '';
        let userId: string = '';

        const users = await UsersDataRecord.getAll();

        const checkIfUserExists: (UserDataEntity[] | null) = users.filter(user => user.email === email);

        if (!checkIfUserExists[0]) {
            throw new ValidationError(`No account with this email: ${email}`);
        }

        const userPassword = await decryptText(checkIfUserExists[0].password, PWD, SALT, checkIfUserExists[0].ivHex);

        if (userPassword !== password) {
            throw new ValidationError('Wrong password.');
        } else {
            loginOk = true;
            userName = checkIfUserExists[0].firstName;
            userId = checkIfUserExists[0].id;
        }

        res.json({
            loginOk,
            userName,
            userId,
        });
    });
