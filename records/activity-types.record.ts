import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';
import {ActivityTypeEntity} from "../types";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

type ActivityTypesRecordResult = [ActivityTypesRecord[], FieldPacket[]];

export class ActivityTypesRecord implements ActivityTypeEntity {
    public readonly id?: string;
    public readonly name: string;

    constructor(obj: ActivityTypeEntity) {
        const {id, name} = obj;

        if(name.trim().length < 2 || name.trim().length > 50) {
            throw new ValidationError(`Activity name should have at least 2 and at most 50 characters, but you have entered ${name.trim().length}.`);
        }

        this.id = id ?? uuid();
        this.name = name;
    }

    static async getAll(): Promise<ActivityTypeEntity[] | null> {
        const [results] = await pool.execute('SELECT * FROM `activity_types`') as ActivityTypesRecordResult;

        if(!results) {
            throw new ValidationError('There are no activity types defined.');
        }

        return results.map(obj => new ActivityTypesRecord(obj));
    };
}
