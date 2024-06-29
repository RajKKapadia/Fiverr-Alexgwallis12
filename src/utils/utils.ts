import dotenv from 'dotenv';
import fs from 'fs';

interface FulfillmentMessage {
    platform: string;
    text: {
      text: string[];
    };
  }
  
  interface ResponseObject {
    fulfillmentMessages: FulfillmentMessage[];
  }
  
  function generateResponseObject(messages: string[]): ResponseObject {
    const fulfillmentMessages: FulfillmentMessage[] = messages.map(message => ({
      platform: 'FACEBOOK',
      text: {
        text: [message]
      }
    }));
  
    return {
      fulfillmentMessages
    };
  }

export function loadEnvVariables(envPath: string = '.env'): Record<string, string> {
    if (!fs.existsSync(envPath)) {
        throw new Error(`.env file not found at ${envPath}`);
    }
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        throw result.error;
    }
    const envVariables: Record<string, string> = {};
    for (const key in process.env) {
        if (Object.prototype.hasOwnProperty.call(process.env, key)) {
            envVariables[key] = process.env[key] || '';
        }
    }
    return envVariables;
};
