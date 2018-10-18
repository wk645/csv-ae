import OktaJwtVerifier from '@okta/jwt-verifier';
import UnauthorizedError from '../custom-errors/unauthorizedError';
import BadRequestError from '../custom-errors/badRequestError';

class OktaAuthorizationHelper {
    hasPermissions(scope) {
        return async function (req, res, next) {
            try {
                const oktaJwtVerifier = new OktaJwtVerifier({ issuer: process.env.ISSUER });

                const { authorization } = req.headers;
                if (!authorization) {
                    return res.status(400).json(new BadRequestError('Missing Authorization Header'));
                }

                const [authType, token] = authorization.trim().split(' ');
                if (authType !== 'Bearer') {
                    return res.status(400).json(new BadRequestError('Missing Bearer Token.'));
                }

                const { claims } = await oktaJwtVerifier.verifyAccessToken(token);

                if (claims && !claims[scope]) {
                    return res.status(401).json(new UnauthorizedError('Unathorized, missing required permissions.'));
                }

                return next();
            } catch (error) {
                return res.status(401).json(new UnauthorizedError(error.message));
            }
        };
    }
}

module.exports = new OktaAuthorizationHelper();
