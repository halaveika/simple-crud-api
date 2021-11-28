# simple-crud-api
Implementatin of simple CRUD API using in-memory database underneath on NodeJS 2021 Q4 RSSchool course

## Run application

Use command line interface:

**npm run start:dev**  ---- starting server on development mode(on http://localhost:4000)

**npm run start:prod** ---- starting server on production mode(on http://localhost:4000)

**npm run test**  ---- run 3 scenario of E2E tests


## Node version

powered by **node v16.13.0**

## API routes

API path **/person**:
GET **/person** or **/person/${personId}**should return all persons or person with corresponding personId

POST **/person**is used to create record about new person and store it in database

PUT **/person/${personId}** is used to update record about existing person

DELETE **/person/${personId}** is used to delete record about existing person from database

## Person schema

Persons are stored as objects that have following properties:

**id**— unique identifier (string, uuid) generated on server side

**name** — person's name **(string, required)**

**age** — person's age **(number, required)**

**hobbies** — person's hobbies **(array of strings or empty array, required)**
