import {Router} from "express";
import {ActivityTypesRecord} from "../records/activity-types.record";

export const activityTypesRouter = Router();

activityTypesRouter

    .get('/', async (req, res) => {
        const activityTypes = await ActivityTypesRecord.getAll();
        res.json(activityTypes);
    });
