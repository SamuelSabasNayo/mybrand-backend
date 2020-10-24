import { request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { fxns } from './function';

// toBe
test('Adds 2 + 3 to equal 5', () => {
    expect(fxns.add(2, 3)).toBe(5);
});

// not.toBe
test('Adds 2 + 3 to NOT equal 4', () => {
    expect(fxns.add(2, 3)).not.toBe(4);
});

// toBeNull
test('Should be null', () => {
    expect(fxns.isNull()).toBeNull();
});

// toBeFalsy
test('Should be falsy', () => {
    expect(fxns.checkValue(null)).toBeFalsy();
});
test('Should be falsy', () => {
    expect(fxns.checkValue(0)).toBeFalsy();
});
test('Should be falsy', () => {
    expect(fxns.checkValue(undefined)).toBeFalsy();
});
test('Should be falsy', () => {
    expect(fxns.checkValue(2)).not.toBeFalsy();
});

// toEqual
test('User should be Sam Nayo object', () => {
    expect(fxns.createUser()).toEqual({
        firstName: 'Sam',
        lastName: 'Nayo'
    });
});

// toStrictEqual
test('User should be Sam Nayo bject', () => {
    expect(fxns.createUser()).toStrictEqual({
        firstName: 'Sam',
        lastName: 'Nayo'
    });
});

// less than and greater than
test('Should be under 1600', () => {
    const load1 = 800;
    const load2 = 700;
    expect(load1 + load2).toBeLessThan(1600);
});

 // less than or equal
test('Should be under 1600', () => {
    const load1 = 800;
    const load2 = 800;
    expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// Regex
test('There is no E in team', () => {
    expect('team').not.toMatch(/E/);
});

// Arrays
test('Admin should be in usernames', () => {
    const usernames = ['John', 'Karen', 'Admin'];
    expect(usernames).toContain('Admin');
});

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
});

// Exceptions
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
};

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});


describe('Test general function', () => {
    it('Should correctly add 2 numbers', () => {
        expect(3 + 4).toEqual(7)
    });
});

const nameCheck = () => console.log('Checking Name....');

describe('Checking Names', () => {
    beforeEach(() => nameCheck());
    
    test('User is Jeff', () => {
        const user = 'Jeff';
        expect(user).toBe('Jeff')
    });
    test('User is Karen', () => {
        const user = 'Karen';
        expect(user).toBe('Karen')
    });
});


// ------------------------------------------
import assert from 'assert';

// Describe tests
describe('Some demo tests', () => {
    
    //Create tests
    it('Adds two numbers together', () => {
        assert(2 + 3 === 5);
    });
});



// import BlogTest from '../src/models/blogTest';

// Describe tests
// describe('Saving blogs', () => {
    
//     //Create tests
//     it('Saving blogs to the database', (done) => {
//         let blogTest1 = new BlogTest({
//             title: 'BlogTest 1'
//         });
        
//         blogTest1.save().then(() => {
//             assert(blogTest1.isNew === false);
//             done();
//         });
//     });
// });