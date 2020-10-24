import request from 'supertest';
import mongoose from 'mongoose';
import config from '../src/config/config';
import generateToken from '../src/helpers/generateToken';
import Blog from '../src/models/blog';
import app from '../src/app';

const DATABASE_URL = config.DATABASE_URL_TEST;

jest.useFakeTimers();

describe('Testing Blogs Endpoints', () => {
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
        await request(app)
            .post('/blogs')
            .set('auth-token', token)
            .send(blog);
            
            expect(blog).not.toBe(null);
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
                title: 'Blog 1',
                author: 'Bobo Barba',
                content: 'This is blog 1'
            });
            
            expect(res.status).toEqual(400);
            done();
    });
})