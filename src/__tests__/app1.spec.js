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
    

describe('E2E TEST: 1 SCENARIO', () => {
  it('GET-запросом получаем все объекты (ожидается пустой массив)', async() =>  {
    const response = await request(app)
                                .get('/person')
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual(persons);    
  });

  let testPayload;
  let testId;
  it('POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект', async() =>  {
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

  it('GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)', async() =>  {
    const response = await request(app)
                                .get(`/person/${testId}`)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toMatchObject(testPayload);             
  })

  it('PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id', async() =>  {
    updatePayload = {name: 'Tester',age: 11, hobbies: ['dance']};
    const response = await request(app)
                                .put(`/person/${testId}`)
                                .send(updatePayload)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toMatchObject(updatePayload);  
  })

  it('DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)', async() =>  {
    updatePayload = {name: 'Tester',age: 11, hobbies: ['dance']};
    const response = await request(app)
                                .delete(`/person/${testId}`)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(204);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toBe('');  
  })

  it('GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)', async() =>  {
    const response = await request(app)
                                .get(`/person/${testId}`)
                                .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toBe('application/json');       
    expect(response.body).toEqual({message: 'No person with such id in store'});             
  })

});


