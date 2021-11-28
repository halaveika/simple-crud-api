const request = require('supertest');
const {app} = require('../app');

beforeEach(() =>
  persons= [
    {
      id: '1c2339c5-ef72-433b-a2da-cdab05988353',
      name: 'JOHN',
      age: 36,
      hobbies: ['drinking','sleeping'],
    },
    {
      id: 'c6f1cbce-040a-4034-ac97-51227fb96f37',
      name: 'Ann',
      age: 22,
      hobbies: ['painting','singing'],
    },
    {
      id: '3cdb76c0-ef7f-4cd0-8ac1-798dc572600a',
      name: 'Olya',
      age: 44,
      hobbies: ['tennis','voleyball'],
    },
    {
      id: '1b106cde-29b1-4bad-8af0-46e793b37673',
      name: 'Peter',
      age: 18,
      hobbies: [],
    },
    {
      id: '2e6244a9-cb57-48ad-b781-794296df3214',
      name: 'Smith',
      age: 45,
      hobbies: ['dating'],
    },
  ]
    )
    
describe('E2E TEST: 3 SCENARIO', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('POST Try to create person on bad route(should retern status code 404 and error message)', async() =>  {

    const payload = {name: 'Adam',age: 18, hobbies: ['football'], education: 'RSSchool'};
    const response = await request(app)
                                .post('/person/dafaffafaf')
                                .send(payload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: '/person/dafaffafaf is bad endpoint. Should be /person or /person/{personId}. For POST only /person'});             
  });

  it('GET-try to get persons with wrong route (should retern status code 404 and error message)', async() =>  {
    const response = await request(app)
                                .get('/persons')
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: '/persons is bad endpoint. Should be /person or /person/{personId}. For POST only /person'});   
  });

  let testPayload;
  let testId;

  it('POST Try to create not valid person without age and hobbies and get 400 error code', async() =>  {
    const testPayload = {name: 'Adam'};
    const response = await request(app)
                                .post('/person')
                                .send(testPayload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: '[age is invalid.]; [hobbies is invalid.]; '});             
  });

  it('POST Try to create not valid person with pass epmty object and get 400 error code', async() =>  {
    const testPayload = {};
    const response = await request(app)
                                .post('/person')
                                .send(testPayload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: '[name is invalid.]; [age is invalid.]; [hobbies is invalid.]; '});             
  });

  
  it('POST-creat new object with 3 requered fields (should receiv new person)', async() =>  {

    testPayload = {name: 'Adam',age: 18, hobbies: ['football']};
    const response = await request(app)
                                .post('/person')
                                .send(testPayload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toMatchObject(testPayload);  
    testId = response.body.id;
  })
  
  

  it('PUT try to update person without pass required fileds (should retern error code 400)', async() =>  {
    const payload = {name: 'Elena'};
    const response = await request(app)
                                .put(`/person/${testId}`)
                                .send(payload)
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toBe('application/json');
    expect(response.body).toEqual({message: '[age is invalid.]; [hobbies is invalid.]; '});          
  });

  it('POST invalid JSON file(should retern status code 400 and error message during json parsing)', async() =>  {

    const payload = JSON.stringify(`{name: 'Adam',age: 18, hobbies: ['football'], education: }`);
    const response = await request(app)
                                .post('/person/dafaffafaf')
                                .send(payload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('application/json');                   
  });
});


