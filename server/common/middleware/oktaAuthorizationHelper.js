import OktaJwtVerifier from '@okta/jwt-verifier';
import UnauthorizedError from '../custom-errors/unauthorizedError';
import BadRequestError from '../custom-errors/badRequestError';
import WinstonLogger from '../logger';

class OktaAuthorizationHelper {
    hasPermissions(scope) {
        return async function (req, res, next) {
            try {
                const oktaJwtVerifier = new OktaJwtVerifier(
                    { issuer: process.env.ISSUER, clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET }
                );

                const { authorization } = req.headers;
                if (!authorization) {
                    const errorResponse = new BadRequestError('Missing Authorization Header.');
                    WinstonLogger.error(errorResponse);

                    return res.status(400).json(errorResponse);
                }

                const [authType, token] = authorization.trim().split(' ');
                if (authType !== 'Bearer') {
                    const errorResponse = new BadRequestError('Missing Bearer Token.');
                    WinstonLogger.error(errorResponse);

                    return res.status(400).json(errorResponse);
                }

                const { claims } = await oktaJwtVerifier.verifyAccessToken(token);

                if (claims && !claims[scope]) {
                    const errorResponse = new BadRequestError('Unauthorized, missing required permissions.');
                    WinstonLogger.error(errorResponse);

                    return res.status(401).json(errorResponse);
                }

                return next();
            } catch (error) {
                WinstonLogger.error(error.message);
                return res.status(401).json(new UnauthorizedError(error.message));
            }
        };
    }
}

module.exports = new OktaAuthorizationHelper();
