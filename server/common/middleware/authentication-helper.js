import OktaJwtVerifier from '@okta/jwt-verifier';
import ForbiddenError from '../custom-errors/forbiddenError';
import UnauthorizedError from '../custom-errors/unauthorizedError';

function userIsLoggedIn(req, res, next) {
    if (!req.user) {
        return res.status(403).json({ error: new ForbiddenError() });
    }

    return next();
}

function hasPermissions(scope) {
    return async function (req, res, next) {
        try {
            const oktaJwtVerifier = new OktaJwtVerifier({ issuer: process.env.ISSUER });

            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(400).json({ Error: 'Missing Authorization Header.' });
            }

            const [authType, token] = authorization.trim().split(' ');
            if (authType !== 'Bearer') {
                return res.status(400).json({ Error: 'Missing Bearer Token.' });
            }

            const { jwt, claims } = await oktaJwtVerifier.verifyAccessToken(token);

            if (!jwt) {
                return res.status(403).json({ Error: new ForbiddenError() });
            }

            const { user } = req;

            if (!user) {
                console.log('No user session');
                return res.status(403).json({ Error: new ForbiddenError() });
            }

            if (!claims.scp.includes(scope)) {
                return res.status(401).json({ Error: new UnauthorizedError() });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ Error: new UnauthorizedError(error.message) });
        }
    };
}

module.exports = {
    hasPermissions,
    userIsLoggedIn
};
