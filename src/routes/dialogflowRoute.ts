import { Router, Request, Response } from "express";

import { ResponseObject, extractSessionVars, generateResponseObject } from '../utils/utils';
import { EventDetailsTypes, createEvent } from "../utils/calendarService";

const router = Router();

const handleCreateEvent = async (req: Request) => {
    try {
        const sessionVars = extractSessionVars(req.body);
        const eventDetails: EventDetailsTypes = {
            summary: `New appointment for ${sessionVars?.AppointmentType}`,
            description: "Sample description.",
            startTime: sessionVars?.DateTime.date_time
        }
        const eventData = await createEvent(eventDetails)
        console.log(eventData);
    } catch (error) {
        console.error('Error in create-event route:', error);
    }
};

router.post('/webhook', async (req: Request, res: Response) => {
    const action = req.body.queryResult.action as string;
    let responseData: ResponseObject = {
        fulfillmentMessages: []
    };
    if (action === 'createEvent') {
        await handleCreateEvent(req);
        responseData.fulfillmentMessages = req.body.queryResult.fulfillmentMessages;
    } else {
        responseData = generateResponseObject([`No handler for the action ${action}.`]);
    }
    res.send(responseData);
});

export default router;
