const backend = require('../Backend/backend.js')

describe('verifyToken middleware', () => {
    test('returns 403 for missing token', () => {
        const req = { headers: {} };
        const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
        const next = jest.fn();

        backend.verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.status().json).toHaveBeenCalledWith({ error: 'Token is required' });
        expect(next).not.toHaveBeenCalled();
    });
});

