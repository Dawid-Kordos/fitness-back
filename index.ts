import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {activityTypesRouter} from "./routers/activity-types";
import {userDataRouter} from "./routers/users-data";
import {activityRegistration} from "./routers/activity-registration";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests per 15 min
}));

app.use('/activity-types', activityTypesRouter);
app.use('/users-data', userDataRouter);
app.use('/activity-data', activityRegistration);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Server is listening on port 3001');
});
