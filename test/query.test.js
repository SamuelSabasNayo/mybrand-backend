/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import generateToken from '../src/helpers/generateToken';
import Query from '../src/models/query';
import app from '../src/app';

const DATABASE_URL = config.DATABASE_URL_TEST;

jest.useFakeTimers();

describe('Testing Query Endpoints', () => {

    describe('Get all queries Endpoint', () => {
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
                password: 'Test123.'
            };
            
            token = generateToken.generate_token(user1);
        });
        
        afterEach(async () => await Query.deleteMany());
        
        it('Get a list of all queries from db', async (done) => {
            const res = await request(app)
                .get('/queries')
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        });
        
        it('Get a single query from db', async (done) => {
            // eslint-disable-next-line no-unused-vars
            const query1 = {
                    name: 'Bobo Barba',
                    email: 'bobo@bob.com',
                    query: 'This is query 1'
            };
                const newQuery = await Query(query1);
                const addedQuery = await newQuery.save();
                const id = addedQuery._id;
                
            const res = await request(app)
                .get(`/queries/${id}`)
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
    
    describe('Add a query Endpoint', () => {
        beforeAll(() => {
            mongoose.connect(DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
        });
        
        let token;
        let query;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                name: 'Bobo Marley',
                email: 'bobo@bob.com',
                password: 'Test123.'
            };
            
            query = {
                name: user1.name,
                email: user1.email,
                query: 'This is query 1'
            };
            
            token = generateToken.generate_token(user1);
        });
        
        afterEach(async () => await Query.deleteMany());
        
        it('Add a query', async (done) => {
            await request(app)
                .post('/queries')
                .set('auth-token', token)
                .send(query);
                
            expect(query).not.toBe(null);
            done();
        });
        
        it('For an existing query, it should return status code of 400', async (done) => {
            const query1 = {
                name: 'Bobo Marley',
                email: 'bobo@bob.com',
                query: 'This is query 1'
            }
            const newQuery = await Query(query1);
            await newQuery.save();
            
            const res = await request(app)
                .post('/queries')
                .set('auth-token', token)
                .send({
                    title: 'Yhis is query 1'
                });
                
            expect(res.status).toEqual(400);
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
                admin: false
            };
            
            // await request(app)
            //     .post('/users/signup')
            //     .send(user1);
            
            token = generateToken.generate_token(user1);
        });
        
        afterEach(async () => await Query.deleteMany());
        
        it('Delete a query from db', async (done) => {
            const query1 = {
                name: 'Bobo Barba',
                email: 'bobo@bob.com',
                query: 'This is query 1'
            };
            
            const newQuery = await Query(query1);
            const addedQuery = await newQuery.save();
            const id = addedQuery._id;
            
            const res = await request(app)
                .delete(`/queries/${id}`)
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        // });
        
        // it('For unexisting user, it should return status code of 500', async (done) => {
        //     const res = await request(app)
        //         .delete('/users/id')
        //         .set('auth-token', token);
                
        //     expect(res.status).toEqual(500);
            done();
        });
    });
});