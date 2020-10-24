import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import User from '../src/models/user';
import app from '../src/app';

const DATABASE_URL = config.DATABASE_URL_TEST;

jest.useFakeTimers();

describe('Testing Signup Endpoints', () => {

    beforeAll(() => {
        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
    });
    
    afterEach(async () => await User.deleteMany());
    
    // Create tests    
    it('Signup a user', async (done) => {
        const user1 = {
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.'
        };
        
        const res = await request(app)
            .post('/users/signup')
            .send(user1);
        
        expect(res.status).toBe(201);
        done();
    });
    
    it('For an existing user, it should return status code of 400', async (done) => {
        const user1 = {
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.'
        };
        
        const newUser = await User(user1);
        await newUser.save();
        
        const res = await request(app)
        .post('/users/signup')
        .send({
            email: 'bobo@bob.com'
        });
        
        expect(res.status).toBe(400);
        done();
    });
});

describe('Testing Login Endpoints', () => {
    
    beforeAll(() => {
        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
    });
    
    beforeEach( async () => {
        const user1 = {
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.'
        };
        
        await request(app)
            .post('/users/signup')
            .send(user1);
    });
    
    afterEach(async () => await User.deleteMany());
    
    // Create login tests    
    it('Login a user', async (done) => {
        const user1 = {
            email: 'bobo@bob.com',
            password: 'Test123.'
        };
        
        const res = await request(app)
            .post('/users/login')
            .send(user1);
        
        expect(res.status).toBe(200);
        done();
    });
        
    it('For an invalid email, it should return status code of 404', async (done) => {
        const user1 = {
            email: 'boboo@bob.com',
            password: 'Test123.'
        };
        
        const res = await request(app)
            .post('/users/login')
            .send(user1);
        
        expect(res.status).toBe(404);
        done();
    });
    
    it('For an invalid password, it should return status code of 400', async (done) => {
        const user1 = {
            email: 'bobo@bob.com',
            password: 'Test123.$'
        };
        
        const res = await request(app)
            .post('/users/login')
            .send(user1);
        
        expect(res.status).toBe(400);
        done();
    });
});