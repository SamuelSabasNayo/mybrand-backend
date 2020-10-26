import request from 'supertest';
import app from '../src/app';

// less than and greater than
test('Should be under 1600', () => {
    const load1 = 800;
    const load2 = 700;
    expect(load1 + load2).toBeLessThan(1600);
});

// describe('Validate User', () => {
//     it('It should validate ', () => {
        
//     });
// });