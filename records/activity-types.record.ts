import {ActivityTypeEntity} from "../types";
import {FieldPacket} from "mysql2";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

type ActivityTypesRecordResult = [ActivityTypesRecord[], FieldPacket[]];

export class ActivityTypesRecord implements ActivityTypeEntity {
    public readonly id?: string;
    public readonly name: string;

    constructor(obj: ActivityTypeEntity) {
        const {id, name} = obj;

        this.id = id;
        this.name = name;
    }

    static async getAll(): Promise<ActivityTypeEntity[] | null> {
        const [results] = await pool.execute('SELECT * FROM `warriors`') as ActivityTypesRecordResult;

        if(!results) {
            throw new ValidationError('There are no activity types defined.');
        }

        return results.map(obj => new ActivityTypesRecord(obj));
    };
}
