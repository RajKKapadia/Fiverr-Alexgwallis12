# Google Dailogflow Webhook
---
Webhook for Google Dialogflow, Nodejs + Express + Typescript

#### Things needed
---
* GCP service account credentials for the project
* Create a new calendar and get the calendar ID, add the service account email to the calendar and give permission to modify the calendar.

#### Instructions
---
* install all the packages `npm i`
* create a `.env` file and fill the variables from the `.env.example` file
* run the application `npm run dev`, this command requires `nodemon`, if not installed on the system, install it using `npm i -g nodemon`
* build `npm run build`
* start `npm run start`

#### Routes
---
* `/dialogflow/webhook` route for the Dialogflow
* `/frontend/webhook` route for frontend
    - POST request
    - body has
        - sessionId: a unique string for a user, must be unique, and must be same for the session
        - query: user's query
    - response
        - startus: error/success
        - response: Facebook Messenger compatible object