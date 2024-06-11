const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/test';

  global.testUser = null;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    const response = await request(app)
        .post('/register')
        .send({
            name: 'John',
            email: 'john@gmail.com',
            password: 'john123',
            confirmPassword: 'john123'
        });
    
    // Save the user details globally
    global.testUser = response.body;
});

afterAll(async () => {
    // Clean up: delete the test user
    await request(app)
        .delete(`/users/${global.testUser.id}`) // Adjust the path to your delete endpoint
        .send({ email: 'john@gmail.com', password: 'john123' });
        await mongoose.connection.close();
});

describe('GET /api', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe('GET /api', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/login');
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe('GET /api', () => {
      it('should return 200 OK', async () => {
          const response = await request(app).get('/register');
          expect(response.statusCode).toBe(200);
      });
      }
      );
  
  describe('GET /api', () => {
      it('should return 200 OK', async () => {
          const response = await request(app).get('/forgotpassword');
          expect(response.statusCode).toBe(200);
      });
      }
      );

      describe('GET /api', () => {
        it('should return 200 OK', async () => {
            const response = await request(app).get('/getlocal');
            expect(response.statusCode).toBe(200);
        });
        }
    );


    // describe('POST /api', () => {
    //         it('should return 302 redirection', async () => {
    //           const response = await request(app).post('/login').send({ email:'john@gmail.com',password:'john123'});
    //           expect(response.statusCode).toBe(302); // Expect a redirect status
    //           expect(response.headers.location).toBe('/'); // Check the redirection URl
    //         }, 10000); 
    //            });
    

    describe('POST /api', () => {
            it('should return 200 OK', async () => {
             // const response = await request(app).post('/register').send({ name: 'John',email:'john@gmail.com',password:'john123'});
              const response = await request(app).post('/forgotpassword').send({ email:'john@gmail.com',password:'john1234',confirmPassword:'john1234'});
                expect(response.statusCode).toBe(302);
                expect(response.headers.location).toBe('/login'); // Check the redirection URl
            }, 10000);
                
            });

    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
           // const response = await request(app).post('/register').send({ name: 'Johny',email:'john@gmail.com',password :'john1234' });
            const response = await request(app).post('/register').send({ name: 'John',email:'john@gmail.com',password :'john123' });
            expect(response.statusCode).toBe(400);
            
        });
        });
              
    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
            const response = await request(app).post('/register').send({ name: 'John',email:'john@gmail.com',password :'john123',confirmPassword:'john1234' });
            expect(response.statusCode).toBe(400);
            //password does not match
            
        });
        }); 
        
    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
           // const response = await request(app).post('/register').send({ name: 'John',email:'john@gmail.com ',password :'john123',confirmPassword:'john123' });
            const response = await request(app).post('/login').send({ email:'john@gmail.com',password :'john1239' });
            expect(response.statusCode).toBe(400);
    
            // expect(response.body.email).toBe('Invalid credentials');
        });
        });
        

    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
            //const response = await request(app).post('/register').send({ name: 'John',email:'johny@gmail.com ',password :'john123',confirmPassword:'john123' });
            const response = await request(app).post('/login').send({ email:'joh123n@gmail.com',password :'john1234' });
            expect(response.statusCode).toBe(400);
            // expect(response.body.email).toBe('User not found please register first');
        });
        });

    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
            const response = await request(app).post('/forgotpassword').send({ email:'joh654n@gmail.com',password :'john1234',confirmPassword:'john1234' });
            expect(response.statusCode).toBe(400);
            // expect(response.body.email).toBe('User not found');
        });
        });

    describe('POST /api', () => {
        it('should return 400 bad request', async () => {
            const response = await request(app).post('/forgotpassword').send({ email:'john@gmail.com',password :'john12345',confirmPassword:'john12349' });
            expect(response.statusCode).toBe(400);
            // expect(response.body.email).toBe('Password does not match');
        });
        });

   