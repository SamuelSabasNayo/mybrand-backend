/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import generateToken from '../src/helpers/generateToken';
import Comment from '../src/models/comment';
import app from '../src/app';

const DATABASE_URL = config.DATABASE_URL_TEST;

jest.useFakeTimers();

describe('Testing Comment Endpoints', () => {

    describe('Get all comments Endpoint', () => {
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
        
        afterEach(async () => await Comment.deleteMany());
        
        it('Get a list of all comments from db', async (done) => {
            const res = await request(app)
                .get('/comments')
                .set('auth-token', token);
                
            expect(res.status).toEqual(404);
            done();
        });
        
        it('Get a single comment from db', async (done) => {
            // eslint-disable-next-line no-unused-vars
            const comment1 = {
                    name: 'Bobo Barba',
                    email: 'bobo@bob.com',
                    comment: 'This is comment 1'
            };
                const newComment = await Comment(comment1);
                const addedComment = await newComment.save();
                const id = addedComment._id;
                
            const res = await request(app)
                .get(`/comments/${id}`)
                .set('auth-token', token);
                
            expect(res.status).toEqual(404);
            done();
        });
    });
    
    // describe('Add a comment Endpoint', () => {
    //     beforeAll(() => {
    //         mongoose.connect(DATABASE_URL, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //             useCreateIndex:true
    //         })
    //     });
        
    //     let token;
    //     let comment;
        
    //     beforeEach( async () => {
    //         const user1 = {
    //             _id: mongoose.Types.ObjectId().toHexString(),
    //             name: 'Bobo Marley',
    //             email: 'bobo@bob.com',
    //             password: 'Test123.'
    //         };
            
    //         comment = {
    //             name: user1.name,
    //             email: user1.email,
    //             comment: 'This is comment 1'
    //         };
            
    //         token = generateToken.generate_token(user1);
    //     });
        
    //     afterEach(async () => await Comment.deleteMany());
        
    //     it('Add a comment', async (done) => {
    //         await request(app)
    //             .post('/comments')
    //             .set('auth-token', token)
    //             .send(comment);
                
    //         expect(comment).not.toBe(null);
    //         done();
    //     });
        
    //     it('For an existing comment, it should return status code of 400', async (done) => {
    //         const comment1 = {
    //             name: 'Bobo Marley',
    //             email: 'bobo@bob.com',
    //             comment: 'This is comment 1'
    //         }
    //         const newComment = await Comment(comment1);
    //         await newComment.save();
            
    //         const res = await request(app)
    //             .post('/comments')
    //             .set('auth-token', token)
    //             .send({
    //                 title: 'Yhis is comment 1'
    //             });
                
    //         expect(res.status).toEqual(400);
    //         done();
    //     });
    // });
    
    // describe('Delete a user Endpoint', () => {
    //     beforeAll(() => {
    //         mongoose.connect(DATABASE_URL, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //             useCreateIndex:true
    //         });
    //     });
        
    //     let token;
        
    //     beforeEach( async () => {
    //         const user1 = {
    //             _id: mongoose.Types.ObjectId().toHexString(),
    //             name: 'Bobo Marley',
    //             email: 'bobo@bob.com',
    //             password: 'Test123.',
    //             admin: false
    //         };
            
    //         // await request(app)
    //         //     .post('/users/signup')
    //         //     .send(user1);
            
    //         token = generateToken.generate_token(user1);
    //     });
        
    //     afterEach(async () => await Comment.deleteMany());
        
        // it('Delete a comment from db', async (done) => {
        //     const comment1 = {
        //         name: 'Bobo Barba',
        //         email: 'bobo@bob.com',
        //         comment: 'This is comment 1'
        //     };
            
        //     const newComment = await Comment(comment1);
        //     const addedComment = await newComment.save();
        //     const id = addedComment._id;
            
        //     const res = await request(app)
        //         .delete(`/comments/${id}`)
        //         .set('auth-token', token);
                
        //     expect(res.status).toEqual(200);
        //     done();
        // });
    // });
});