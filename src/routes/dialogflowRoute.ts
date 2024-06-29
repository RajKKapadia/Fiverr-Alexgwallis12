import { Router, Request, Response } from "express";
import moment from 'moment-timezone';

import { CalendarService, CredentialsTypes } from "../utils/calendarService";
import { loadEnvVariables } from '../utils/utils';

const router = Router();

const envVariables = loadEnvVariables();

const CREDENTIALS: CredentialsTypes = JSON.parse(JSON.stringify(envVariables.CREDENTIALS)) || null;

const calendarService = new CalendarService(CREDENTIALS);

const handleCreateEvent = async (req: Request) => {
    try {
        const { summary, description, startDateTime } = req.body;
        // Parse the incoming startDateTime
        const start = moment(startDateTime);
        // Add one hour to get the endDateTime
        const end = moment(start).add(1, 'hour');
        const timeZone = 'America/New_York'; // 'en-US' timezone (you can adjust this as needed)
        const eventId = await calendarService.createEvent({
            summary,
            description,
            startDateTime: start.tz(timeZone).format(),
            endDateTime: end.tz(timeZone).format(),
            timeZone,
        });
        return {
            message: 'Event created successfully',
            eventId,
            startDateTime: start.tz(timeZone).format(),
            endDateTime: end.tz(timeZone).format()
        };
    } catch (error) {
        console.error('Error in create-event route:', error);
        return { error: 'Failed to create event' };
    }
};

router.post('/webhook', async (req: Request, res: Response) => {
    console.log(JSON.stringify(req.body));
    res.send({
        fulfillmentMessages: [{
            platform: 'FACEBOOK',
            text: {
                text: ['text one.']
            }
        }, {
            platform: 'FACEBOOK',
            text: {
                text: ['text two.']
            }
        }]
    });
});

export default router;
