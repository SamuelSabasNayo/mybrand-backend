/* eslint-disable no-undef */
// import jest from 'jest';
import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import generateToken from '../src/helpers/generateToken';
import Blog from '../src/models/blog';
import app from '../src/app';

const DATABASE_URL = config.DATABASE_URL_TEST;

jest.useFakeTimers();

describe('Testing Blogs Endpoints', () => { 

    describe('Get Blogs Endpoint', () => {
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
        
        afterEach(async () => await Blog.deleteMany());
        
        it('Get a list of all blogs from db', async (done) => {
            const res = await request(app)
                .get('/blogs')
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        });
        
        
        it('Get a single blog from db', async (done) => {
            // eslint-disable-next-line no-unused-vars
            const blog1 = {
                    title: 'Blog 1',
                    author: 'Bobo Barba',
                    content: 'This is blog 1'
                };
                
                const newBlog = await Blog(blog1); 
                const addedBlog = await newBlog.save();
                const id = addedBlog._id;
                
            const res = await request(app)
                .get(`/blogs/${id}`)
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        });
    });
    
    describe('Add a blog Endpoint', () => {
        beforeAll(() => {
            mongoose.connect(DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
        });
        
        let token;
        let blog;
        
        beforeEach( async () => {
            const user1 = {
                _id: mongoose.Types.ObjectId().toHexString(),
                name: 'Bobo Marley',
                email: 'bobo@bob.com',
                password: 'Test123.'
            };
            
            blog = {
                title: 'Blog 1',
                author: user1.name,
                content: 'This is blog 1'
            };
            
            token = generateToken.generate_token(user1);
        });
        
        afterEach(async () => await Blog.deleteMany());
        
        it('Add a blog', async (done) => {
            const res = await request(app)
                .post('/blogs')
                .set('auth-token', token)
                .send(blog);
                
            expect(blog).not.toBe(null);
            expect(res.status).toBe(201);
            done();
        });
        
        it('For an existing blog, it should return status code of 400', async (done) => {
            const blog1 = {
                title: 'Blog 1',
                author: 'Bobo Barba',
                content: 'This is blog 1'
            };
            
            const newBlog = await Blog(blog1);
            await newBlog.save();
            
            const res = await request(app)
                .post('/blogs')
                .set('auth-token', token)
                .send({
                    title: 'Blog 1'
                });
                
            expect(res.status).toEqual(400);
            done();
        });
    });
    
    describe('Delete a Blog Endpoint', () => {
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
        
        afterEach(async () => await Blog.deleteMany());
        
        it('Delete a blog from db', async (done) => {
            const blog1 = {
                title: 'Blog 1',
                author: 'Bobo Barba',
                content: 'This is blog 1'
            };
            
            const newBlog = await Blog(blog1);
            const addedBlog = await newBlog.save();
            const id = addedBlog._id;
            
            const res = await request(app)
                .delete(`/blogs/${id}`)
                .set('auth-token', token);
                
            expect(res.status).toEqual(200);
            done();
        });
        
        it('For unexisting blog, it should return status code of 500', async (done) => {
            const res = await request(app)
                .delete('/blogs/id')
                .set('auth-token', token);
                
            expect(res.status).toEqual(500);
            done();
        });
    });
    
    describe('Update a Blog Endpoint', () => {
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
        
        afterEach(async () => await Blog.deleteMany());
        
        it('Update a blog from db', async (done) => {
            const blog1 = {
                title: 'Blog 1',
                author: 'Bobo Barba',
                content: 'This is blog 1'
            };
            
            const newBlog = await Blog(blog1);
            const addedBlog = await newBlog.save();
            const id = addedBlog._id;
            
            const res = await request(app)
                .put(`/blogs/${id}`)
                .set('auth-token', token)
                .send({
                    
                });
                
            expect(res.status).toEqual(200);
            done();
        });
        
        // it('For unexisting blog, it should return status code of 500', async (done) => {
        //     const res = await request(app)
        //         .put('/blogs/id')
        //         .set('auth-token', token);
                
        //     expect(res.status).toEqual(500);
        //     done();
        // });
    });
});
