import {Router} from "express";
import {ActivityRegistrationRecord} from "../records/activity-registration.record";

export const activityRegistration = Router();

activityRegistration
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

        console.log(req.body);

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
