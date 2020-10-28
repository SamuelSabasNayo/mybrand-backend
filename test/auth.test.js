/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import generateToken from '../src/helpers/generateToken';
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
        const res = await request(app)
            .post('/users/signup')
            .send({
                name: 'Bobo Marley',
                email: 'bobo@bob.com',
                password: 'Test123.'
            });
        
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
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.'
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

describe('Get all User Endpoint', () => {
    
    beforeAll(() => {
        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
    });
    
    let token;
    
    beforeEach( async () => {
        const user1 = {
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.',
            admin: true
        };
        
        await request(app)
            .post('/users/signup')
            .send(user1);
        
        token = generateToken.generate_token(user1);
    });
    
    
    afterEach(async () => await User.deleteMany());
    
    it('Get a list of all users', async (done) => {
        const res = await request(app)
            .get('/users')
            .set('auth-token', token);
        
        expect(res.status).toBe(200);
        done();
    });
    
    it('Get a single user from db', async (done) => {
        const user2 = {
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.',
            admin: false
        };
        
        const newUser = await User(user2);
        const addedUser = await newUser.save();
        const id = addedUser._id;
        
        const res = await request(app)
            .get(`/users/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toEqual(200);
        done();
    });
});

describe('Delete a user Endpoint', () => {
    beforeAll(() => {
        mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        });
    });
    
    let token;
    
    beforeEach( async () => {
        const user1 = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name: 'Bobo Marley',
            email: 'bobo@bob.com',
            password: 'Test123.',
            admin: true
        };
        
        // await request(app)
        //     .post('/users/signup')
        //     .send(user);
        
        token = generateToken.generate_token(user1);
    });
    
    afterEach(async () => await User.deleteMany());
    
    it('Delete a user from db', async (done) => {
        
        const user2 = {
            name: 'Simon Mpuwe',
            email: 'simon@gmail.com',
            password: 'Test123.'
        };
        
        const newUser = await User(user2);
        const addedUser = await newUser.save();
        const id = addedUser._id;
        
        const res = await request(app)
            .delete(`/users/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toEqual(200);
        done();
    });
    
    it('For unexisting user, it should return status code of 500', async (done) => {
        const nonUser = {};
        const id = nonUser._id;
        const res = await request(app)
            .delete(`/user/${id}`)
            .set('auth-token', token);
            
        expect(res.status).toEqual(404);
        done();
    });
});