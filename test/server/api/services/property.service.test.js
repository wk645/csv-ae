import sinon from 'sinon';
import { expect } from 'chai';

import PropertyService from '../../../../server/api/services/property.service';

describe('Property Service', () => {
    const mockPropertyId = '1';
    const mockPropertyId2 = '2';
    const mockAddedPropertyId = '3';
    const mockPropertyName = '101g';
    const mockPropertyCity = 'ny';
    const mockPropertyAddress = '101 greenwich';
    const mockPropertyEmail = 'test@convene.com';
    const mockPropertyPhone = '555-444-3333';
    const mockUpdatedPhone = '111-111-1111';
    const mockCreatedAt = '2018-10-24T19:21:34.759Z';

    afterEach(() => {
        sinon.restore();
    });

    describe('#getAllProperties()', () => {
        it('should return all properties', async () => {
            const spy = sinon.spy();
            const stub = sinon.stub(PropertyService, 'getAllProperties');
            stub.returns(
                [{
                    id: mockPropertyId,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                },
                {
                    id: mockPropertyId2,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                }]
            );

            PropertyService.getAllProperties(stub);
            PropertyService.getAllProperties(spy);

            expect(spy.called);
            expect(stub()).to.have.lengthOf(2);
        });
    });

    describe('#getPropertyById()', () => {
        it('should return specific property by id', async () => {
            const stub = sinon.stub(PropertyService, 'getPropertyById');
            stub.withArgs(1).returns(
                [{
                    id: mockPropertyId,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                }]
            );
            const spy = sinon.spy();

            PropertyService.getPropertyById(mockPropertyId, stub);
            PropertyService.getPropertyById(mockPropertyId, spy);

            expect(spy.called);
            expect(stub(1)[0].id).to.equal(mockPropertyId);
        });
    });

    describe('#addProperty()', () => {
        it('should add property', async () => {
            const params = [mockPropertyName, mockPropertyCity, mockPropertyAddress, mockPropertyEmail, mockPropertyPhone];

            const stub = sinon.stub(PropertyService, 'addProperty');
            stub.withArgs(params).returns(
                [{
                    id: mockAddedPropertyId,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                }]
            );
            const spy = sinon.spy();

            PropertyService.addProperty(params, stub);
            PropertyService.addProperty(params, spy);

            expect(spy.called);
            expect(stub(params)).to.have.lengthOf(1);
            expect(stub(params)[0].id).to.equal(mockAddedPropertyId);
        });
    });

    describe('#updateProperty()', () => {
        it('should update specific property', async () => {
            const params = [mockPropertyId2, mockPropertyName, mockPropertyCity, mockPropertyAddress, mockPropertyEmail, mockUpdatedPhone];

            const stub = sinon.stub(PropertyService, 'updateProperty');
            stub.withArgs(params).returns(
                [{
                    id: mockPropertyId2,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockUpdatedPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                }]
            );
            const spy = sinon.spy();

            PropertyService.updateProperty(params, stub);
            PropertyService.updateProperty(params, spy);

            expect(spy.called);
            expect(stub(params)).to.have.lengthOf(1);
            expect(stub(params)[0].phone).to.equal(mockUpdatedPhone);
        });
    });

    describe('#deleteProperty()', () => {
        it('should delete specific property', async () => {
            const stub = sinon.stub(PropertyService, 'deleteProperty');
            stub.withArgs(mockAddedPropertyId).returns(
                [{
                    id: mockPropertyId,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                },
                {
                    id: mockPropertyId2,
                    name: mockPropertyName,
                    city: mockPropertyCity,
                    address: mockPropertyAddress,
                    email: mockPropertyEmail,
                    phone: mockPropertyPhone,
                    createdAt: mockCreatedAt,
                    updatedAt: mockCreatedAt
                }]
            );
            const spy = sinon.spy();

            PropertyService.deleteProperty(mockAddedPropertyId, stub);
            PropertyService.deleteProperty(mockAddedPropertyId, spy);

            expect(stub(mockAddedPropertyId)).to.have.lengthOf(2);
            expect(stub(mockAddedPropertyId)[0].id).to.equal(mockPropertyId);
            expect(stub(mockAddedPropertyId)[1].id).to.equal(mockPropertyId2);
        });
    });
});
