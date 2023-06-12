import { Sort } from '@angular/material/sort';
import { transformSortToQueryString } from './transform-sort.helper';

const mockSortEvent: Sort = {
  // name is the column being sorted
  active: 'name',
  direction: '',
};

describe('Transform Sort Helper', () => {
  it('should return ordering for undefined sorting', () => {
    expect(transformSortToQueryString(mockSortEvent)).toEqual('name');
  });
  it('should return ordering for ascending sorting', () => {
    mockSortEvent.direction = 'asc';
    expect(transformSortToQueryString(mockSortEvent)).toEqual('name');
  });
  it('should return -ordering for descending sorting', () => {
    mockSortEvent.direction = 'desc';
    expect(transformSortToQueryString(mockSortEvent)).toEqual('-name');
  });
});
