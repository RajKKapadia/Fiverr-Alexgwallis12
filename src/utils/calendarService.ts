import { google, calendar_v3 } from 'googleapis';
import moment from 'moment-timezone';

export type CredentialsTypes = {
    type: string
    project_id: string
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_x509_cert_url: string
    universe_domain: string
}

export class CalendarService {
    private calendar: calendar_v3.Calendar | null;
    constructor(credentials: CredentialsTypes) {
        if (credentials === null) {
            this.calendar = null;
        }
        const jwtClient = new google.auth.JWT(
            credentials.client_email,
            undefined,
            credentials.private_key,
            ['https://www.googleapis.com/auth/calendar']
        );
        this.calendar = google.calendar({ version: 'v3', auth: jwtClient });
    }

    async createEvent(eventDetails: {
        summary: string;
        description: string;
        startDateTime: string;
        endDateTime: string;
        timeZone: string;
    }): Promise<string> {
        const { summary, description, startDateTime, endDateTime, timeZone } = eventDetails;
        if (this.calendar === null) {
            console.error('Check the credentials.');
            return '';
        }
        const event: calendar_v3.Schema$Event = {
            summary,
            description,
            start: {
                dateTime: moment.tz(startDateTime, timeZone).format(),
                timeZone,
            },
            end: {
                dateTime: moment.tz(endDateTime, timeZone).format(),
                timeZone,
            },
        };
        try {
            const response = await this.calendar.events.insert({
                calendarId: 'primary',
                requestBody: event,
            });
            return response.data.id || '';
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }
};
