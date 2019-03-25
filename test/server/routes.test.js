import supertest from 'supertest';

const server = supertest.agent('http://localhost:8081');

const routes = {
    home: '/',
    healthcheck: '/api/service-boilerplate-back-end-web/v1/healthcheck',
    property: '/api/service-boilerplate-back-end-web/v1/property',
    swagger: '/api/service-boilerplate-back-end-web/v1/docs',
    mockInvalidRoute: '/mockInvalidRoute'
};

describe('Routes', () => {
    it('should return homepage route', done => {
        server
            .get(routes.home)
            .set('Accept', 'application/json')
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(200);
        done();
    });

    it('should return healthcheck route', done => {
        server
            .get(routes.healthcheck)
            .set('Accept', 'application/json')
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200);
        done();
    });

    it('should return property route', done => {
        server
            .get(routes.property)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(401);
        done();
    });

    it('should return swagger route', done => {
        server
            .get(routes.swagger)
            .set('Accept', 'application/json')
            .expect('Content-type', 'text/html; charset=UTF-8')
            .expect(301);
        done();
    });

    it('should return route not found error', () => {
        server
            .get(routes.mockInvalidRoute)
            .expect(404);
    });
});
