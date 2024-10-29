import { getUrl } from 'shared/api/request.ts';

describe('test url creation', () => {
  it('should remove / from url', () => {
    const url = getUrl('test_url/', {
      text: 'test',
      from: 0,
      size: 100
    });
    expect(url).toBe('test_url?text=test&from=0&size=100');
  });

  it('should create url without /', () => {
    const url = getUrl('test_url', {
      text: 'test',
      from: 0,
      size: 100
    });
    expect(url).toBe('test_url?text=test&from=0&size=100');
  })
});
