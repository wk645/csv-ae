import sinon from 'sinon';
import { expect } from 'chai';

import healthService from '../../../../server/api/services/health.service';

describe('Health Service', () => {
    const mockStatus = [{ Healthy: true }];
    afterEach(() => {
        sinon.restore();
    });

    describe('#healthCheck()', () => {
        it('should return the health status', async () => {
            const stub = sinon.stub().returns(mockStatus);
            const spy = sinon.spy();

            healthService.healthCheck(stub);
            healthService.healthCheck(spy);

            expect(spy.called);
            expect(stub()).to.eql(mockStatus);
            expect(stub()[0].Healthy).be.true;
            expect(stub()).to.have.lengthOf(1);
        });
    });
});
