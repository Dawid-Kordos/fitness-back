import {v4 as uuid} from 'uuid';
import {UserDataEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

export class UsersDataRecord implements UserDataEntity {
    public id?: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public password1?: string;

    constructor(obj: UserDataEntity) {
        const {id, firstName, lastName, email, password, password1} = obj;

        if(!firstName || !lastName || !email || !password || !password1){
            throw new ValidationError('Please fill all fields.');
        }

        if (firstName.trim().length < 3 || firstName.length > 20) {
            throw new ValidationError(`First name must have at least 3 and at most 20 characters, but you have entered ${firstName.trim().length}.`);
        }

        if (lastName.trim().length < 3 || lastName.length > 55) {
            throw new ValidationError(`Last name must have at least 3 and at most 55 characters, but you have entered ${lastName.trim().length}.`);
        }

        if (email.indexOf('@') === -1) {
            throw new ValidationError('Email must contain @.');
        }

        if (email.trim().length < 7 || email.length > 75) {
            throw new ValidationError(`Email must have at least 7 and at most 75 characters, but you have entered ${email.trim().length}.`);
        }

        if (password.trim().length < 8 || password.length > 20 || password1.trim().length < 8 || password1.length > 20) {
            throw new ValidationError('Password must have at least 8 and at most 20 characters');
        }

        if (password !== password1) {
            throw new ValidationError('Passwords must be equal.');
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
    }
}
