import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";
import {UserDataEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

type UsersDataRecordResult = [UsersDataRecord[], FieldPacket[]];

export class UsersDataRecord implements UserDataEntity {
    public id?: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public password1?: string;

    constructor(obj: UserDataEntity) {
        const {id, firstName, lastName, email, password, password1} = obj;

        if (firstName.trim().length < 3 || firstName.length > 20) {
            throw new ValidationError(`First name must have at least 3 and at most 20 characters, but you have entered ${firstName.trim().length}.`);
        }

        if (lastName.trim().length < 3 || lastName.length > 55) {
            throw new ValidationError(`Last name must have at least 3 and at most 55 characters, but you have entered ${lastName.trim().length}.`);
        }

        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            throw new ValidationError('Incorrect email format.');
        }

        if (email.trim().length < 7 || email.length > 75) {
            throw new ValidationError(`Email must have at least 7 and at most 75 characters, but you have entered ${email.trim().length}.`);
        }

        if (password.trim().length < 8 || password.length > 20) {
            throw new ValidationError('Password must have at least 8 and at most 20 characters');
        }

        if (password !== password1) {
            throw new ValidationError('Passwords are not the same.');
        }

        this.id = id ?? uuid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.password1 = password1;
    }

    async insert(): Promise<string> {
        await pool.execute(
            'INSERT INTO `users_data` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES(:id, :firstName, :lastName, :email, :password)', {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            });

        return this.id;
    };

    static async getAll(): Promise<UserDataEntity[] | null> {
        const [result] = await pool.execute('SELECT * FROM `users_data`') as UsersDataRecordResult;

        return result.map(obj => new UsersDataRecord({
            ...obj,
            password1: obj.password,
        }));
    };

    static async getOne(id: string): Promise<UserDataEntity | null> {
        const [result] = await pool.execute(
            'SELECT * FROM `users_data` WHERE `id` = :id', {
                id,
            }) as UsersDataRecordResult;

        return result.length === 0 ? null : new UsersDataRecord({
            ...result[0],
            password1: result[0].password,
        });
    };
}
