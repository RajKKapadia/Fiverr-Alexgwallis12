import dialogflow from '@google-cloud/dialogflow';
import { loadEnvVariables } from './utils';
import { CredentialsTypes } from './calendarService';

const envVariables = loadEnvVariables();

const serviceAccount: CredentialsTypes = JSON.parse(envVariables.CREDENTIALS);

export const detectIntent = async (sessionId: string, query: string, languageCode: string = 'en-US') => {
    const sessionClient = new dialogflow.SessionsClient({
        credentials: {
            client_email: serviceAccount.client_email,
            private_key: serviceAccount.private_key
        }
    })
    const sessionPath = sessionClient.projectAgentSessionPath(
        serviceAccount.project_id,
        sessionId
    );
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };
    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        if (result) {
            return {
                status: 'success',
                response: {
                    fulfillmentMessages: result.fulfillmentMessages,
                    intent: result.intent ? result.intent.displayName : null,
                    confidence: result.intentDetectionConfidence,
                }
            };
        } else {
            return {
                status: 'error',
                response: 'No result from Dialogflow.'
            };
        }
    } catch (error) {
        console.error('Error detecting intent:', error);
        return {
            status: 'error',
            response: 'Error detecting intent.'
        };
    }
};
