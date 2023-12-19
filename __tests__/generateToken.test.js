const backend = require('../Backend/backend.js')


const jwt = require('jsonwebtoken');

describe('generateToken function', () => {
    const mockUser = {
        username: 'testuser',
        email: 'test@example.com',
    };

    test('returns a token of type string', () => {

        const token = backend.generateToken(mockUser);

        expect(typeof token).toBe('string');

        jest.restoreAllMocks();
    });
});


