import {Router} from "express";
import {ActivityRegistrationRecord} from "../records/activity-registration.record";

export const activityRegistration = Router();

activityRegistration

    .get('/:userId', async (req, res) => {
        const {userId} = req.params;
        const userActivities = await ActivityRegistrationRecord.getAllUserActivities(userId);
        res.json(userActivities);
    })

    .get('/:userId/:date', async (req, res) => {
        const {userId, date} = req.params;
        const userActivities = await ActivityRegistrationRecord.getAllDateWiseUserActivities(userId, date);
        res.json(userActivities);
    })


    .delete('/:id', async (req, res) => {
        const {id} = req.params;
        const activity = await ActivityRegistrationRecord.getOne(id);
        await new ActivityRegistrationRecord(activity).delete();
        res.json(id);
    })

    .post('/', async (req, res) => {
        const {
            activityName,
            activityDate,
            activityStartTime,
            activityDuration,
            activityDistance,
            activitySpeed,
            activityComment
        } = req.body;

        const activity = new ActivityRegistrationRecord({
            ...req.body,
            activityName,
            activityDate,
            activityStartTime,
            activityDuration,
            activityDistance,
            activitySpeed,
            activityComment,
        });

        const id = await activity.insert();

        res.json(id);
    });
