const request = require('supertest');
const {app} = require('../app')

let persons;

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
    
describe('E2E TEST: 2 SCENARIO', () => {

  it('POST Try to create not valid person and get 400 error code', async() =>  {
    const payload = {name: 'Adam',hobbies: ['football']};
    const response = await request(app)
                                .post('/person')
                                .send(payload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: '[age is invalid.]; '});             
  });

  let testPayload;
  let testId;
  it('POST-creat new object with 3 requered fiields and 1 optinal (should receiv new person)', async() =>  {
    testPayload = {name: 'Adam',age: 18, hobbies: ['football'], education: 'RSSchool'};
    const response = await request(app)
                                .post('/person')
                                .send(testPayload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toMatchObject(testPayload);  
    testId = response.body.id;
  })

  it('PUT update previouse object with new information (should retern updated object with old id)', async() =>  {
    const payload = {name: 'Elena',age: 33, hobbies: ['pool'],education: 'RSSchool'};
    const response = await request(app)
                                .put('/person/1c2339c5-ef72-433b-a2da-cdab05988353')
                                .send(payload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');
    payload.id = response.body.id;
    expect(response.body).toMatchObject(payload);             
  });

  it('DELETE previous created object but we send not valid id (should retern code error 404)', async() =>  {
    const response = await request(app)
                                .delete(`/person/${testId}1`)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message:'person id is not uuid format'});          
  });

  it('DELETE previous created object (should retern status code 204 and empty body response)', async() =>  {
    const response = await request(app)
                                .delete(`/person/${testId}`)
                                .set('Accept', 'application/json');
  expect(response.statusCode).toBe(204);
  expect(response.headers['content-type']).toBe('application/json');       
  expect(response.body).toBe('');          
  });

  it('DELETE previous deleted object(should retern code error 404 and message)', async() =>  {
    const response = await request(app)
                                .delete(`/person/${testId}`)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message:'No person with such id in store'});          
  });
});

