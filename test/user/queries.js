import { expect } from 'chai';
import { customerFields } from '../../app/user/db/query/queryCustomer.js';
import { getByName } from '../../app/user/db/query/queryUser.js';

describe('Query input sanitisation', () => {
  it('keeps only known string customer fields', () => {
    const body = { firstName: 'Test', lastName: { $ne: null }, company: 'abc', role: 'admin', $where: '1' };

    expect(customerFields(body)).to.deep.equal({ firstName: 'Test', company: 'abc' });
  });

  it('handles a missing body', () => {
    expect(customerFields(undefined)).to.deep.equal({});
  });

  it('does not query users with a non-string name', async () => {
    expect(await getByName({ $ne: null })).to.equal(null);
  });
});
