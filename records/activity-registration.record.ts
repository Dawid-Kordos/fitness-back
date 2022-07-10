import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
import {ActivityRegistrationEntity} from "../types/training/ActivityRegistrationEntity";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

type ActivityRegistrationRecordResult = [ActivityRegistrationRecord[], FieldPacket[]];

export class ActivityRegistrationRecord implements ActivityRegistrationEntity {
    public id?: string;
    public userId: string;
    public activityName: string;
    public activityDate: string;
    public activityStartTime: string;
    public activityDuration: number;
    public activityDistance?: number | null;
    public activitySpeed?: number | null;
    public activityComment?: string | null;

    constructor(obj: ActivityRegistrationEntity) {
        const {
            id,
            userId,
            activityName,
            activityDate,
            activityStartTime,
            activityDuration,
            activityDistance,
            activitySpeed,
            activityComment
        } = obj;

        if (!activityName) {
            throw new ValidationError('Choose an activity.');
        }

        if (!activityDate) {
            throw new ValidationError('Choose activity date.');
        }

        if (!activityStartTime) {
            throw new ValidationError('Add start time of activity.');
        }

        if (!activityDuration) {
            throw new ValidationError('Add activity duration.');
        }

        this.id = id ?? uuid();
        this.userId = userId;
        this.activityName = activityName;
        this.activityDate = activityDate;
        this.activityStartTime = activityStartTime;
        this.activityDuration = activityDuration;
        this.activityDistance = activityDistance ? activityDistance : null;
        this.activitySpeed = activitySpeed ? activitySpeed : null;
        this.activityComment = activityComment ? activityComment : null;
    }

    async insert(): Promise<string> {
        await pool.execute(
            'INSERT INTO `activities_users` (`id`, `userId`, `activityName`, `activityDate`, `activityStartTime`, `activityDuration`, `activityDistance`, `activitySpeed`, `activityComment`) VALUES(:id, :userId, :activityName, :activityDate, :activityStartTime, :activityDuration, :activityDistance, :activitySpeed, :activityComment)', {
                id: this.id,
                userId: this.userId,
                activityName: this.activityName,
                activityDate: this.activityDate,
                activityStartTime: this.activityStartTime,
                activityDuration: this.activityDuration,
                activityDistance: this.activityDistance,
                activitySpeed: this.activitySpeed,
                activityComment: this.activityComment,
            });

        return this.id;
    };

    static async getAllUserActivities(userId: string): Promise<ActivityRegistrationEntity[] | null> {
        const [result] = await pool.execute('SELECT * FROM `activities_users` WHERE `userId` = :userId ORDER BY `activityDate` DESC', {
            userId,
        }) as ActivityRegistrationRecordResult;

        return result.map(obj => new ActivityRegistrationRecord(obj));
    };

    static async getAllDateWiseUserActivities(userId: string, activityDate: string): Promise<ActivityRegistrationEntity[] | null> {
        const [result] = await pool.execute('SELECT * FROM `activities_users` WHERE `userId` = :userId AND `activityDate` = :activityDate ORDER BY `activityName` ASC', {
            userId,
            activityDate,
        }) as ActivityRegistrationRecordResult;

        return result.map(obj => new ActivityRegistrationRecord(obj));
    };

    static async getOne(id: string): Promise<ActivityRegistrationEntity | null> {
        const [result] = await pool.execute(
            'SELECT * FROM `activities_users` WHERE `id` = :id', {
                id,
            }) as ActivityRegistrationRecordResult;

        return result.length === 0 ? null : new ActivityRegistrationRecord(result[0]);
    };
}
